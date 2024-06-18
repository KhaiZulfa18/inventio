import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashbordLayout from '@/Layouts/Dashboard';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <DashbordLayout>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to the dashboard!</p>
        </DashbordLayout>
    );
}
