import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";
import Card from '@/Components/Card';
import { CubeIcon } from '@heroicons/react/24/outline';
import Button from '@/Components/Button';

export default function Dashboard({ auth }) {
    return (
        <AppLayout>
            <Head title='Dashboard'></Head>

            <Card className={"w-full xl:w-1/2"}>
                <Card.Body>
                    <h3 className='text-xl font-bold'>Welcome, { auth.user.name }</h3>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <Button type={'button'} style={'primary'}>Primary</Button>
                        <Button type={'button'} style={'info'}>Info</Button>
                        <Button type={'button'} style={'danger'}>Danger</Button>
                        <Button type={'button'} style={'warning'}>Warning</Button>
                        <Button type={'button'} style={'success'}>Success</Button>
                        <Button type={'button'} style={'secondary'}>Secondary</Button>
                    </div>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}
