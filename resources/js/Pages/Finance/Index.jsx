import Card from "@/Components/Card";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, BanknotesIcon, CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";

export default function Index({auth}) {
    
    return (
        <AppLayout>
            <Head title="Laporan Keuangan"></Head>

            <Card>
                <Card.Header>
                    <BanknotesIcon className="w-5"/> Laporan Keuangan
                </Card.Header>
                <Card.Body>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                            <ArrowTrendingUpIcon className="w-6 h-6 text-green-500 mr-3"/>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Pendapatan</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Rp. 10,000,000</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                            <ArrowTrendingDownIcon className="w-6 h-6 text-red-500 mr-3"/>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Pengeluaran</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Rp. 5,000,000</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                            <CurrencyDollarIcon className="w-6 h-6 text-green-500 mr-3"/>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Laba</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Rp. 5,000,000</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                            <CurrencyDollarIcon className="w-6 h-6 text-red-500 mr-3"/>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rugi</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Rp. 0</p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}