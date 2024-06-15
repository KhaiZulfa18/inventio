# Gunakan image resmi PHP dengan Apache
FROM php:8.2-apache

# Setel direktori kerja
WORKDIR /var/www/html

# Instal dependensi
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip

# Instal ekstensi PHP
RUN docker-php-ext-install pdo_mysql gd

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Instal Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Supervisor
RUN apt-get install -y supervisor

# Copy the Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Salin file proyek ke dalam container
COPY . .

# Setel hak akses untuk direktori penyimpanan Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Jalankan Composer untuk menginstal dependensi
RUN composer install

# Install npm dependencies
RUN npm install

# Salin konfigurasi virtual host
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

# Aktifkan mod_rewrite untuk Laravel
RUN a2enmod rewrite

# Ekspos port 80
EXPOSE 80

# Jalankan Apache dalam foreground
# CMD ["apache2-foreground"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
