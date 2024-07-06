import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <Card>
                <Card.Body className='sm:px-6 lg:px-8 space-y-6'>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                    <hr></hr>
                    <UpdatePasswordForm className="max-w-xl" />
                </Card.Body>
            </Card>
        </AppLayout>
    );
}
