import DangerButton2 from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import Button2 from '@/Components/Button2';
import TableHead from '@/Components/TableHead';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashbordLayout from '@/Layouts/Dashboard';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

        <Head title="Dashoard"></Head>
            
        </AuthenticatedLayout>
    );
}
