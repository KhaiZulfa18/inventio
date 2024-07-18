import clsx from "clsx";
import toast from "react-hot-toast";

const useToast = () => {
    const showToast = (message, type = 'success') => {
        const toastOptions = {
            duration: 4000,
            position: 'top-right',
            style: {
                padding: '16px',
            },
            className: clsx(type === 'success' 
            ? 'bg-green-100 border border-green-500 text-green-500'
            : 'bg-red-100 border border-red-500 text-red-500', 'p-6'),
            iconTheme: {
                primary: type === 'success' ? '#4caf50' : '#f44336',
                secondary: '#FFFAEE',
            },
        };

        if (type === 'success') {
            toast.success(message, toastOptions);
        } else if (type === 'error') {
            toast.error(message, toastOptions);
        } else {
            toast(message, toastOptions);
        }
    };

    return { showToast };
};

export default useToast;
