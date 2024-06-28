import AppLayout from "@/Layouts/AppLayout";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth}) {
    return (
        <AppLayout>
            <Head title="Pengguna"></Head>

            <div className={`p-4 rounded-t-lg border bg-white dark:bg-gray-950 dark:border-gray-900 `}>
                <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-200'>
                    <UserGroupIcon className="w-5"></UserGroupIcon> Pengguna
                </div>
            </div>
        </AppLayout>
    );
}