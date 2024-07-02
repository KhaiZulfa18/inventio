import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";
import Card from '@/Components/Card';
import { CubeIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    console.log(auth);
    return (
        <AppLayout>
            <Head title='Dashboard'></Head>

            <Card className={"w-1/2"}>
                <Card.Body>
                    <h3 className='text-xl font-bold'>Welcome, { auth.user.name }</h3>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}
