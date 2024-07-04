import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from '@inertiajs/react'

export default function Create({auth, roles, success}) {

    const {data, setData, post, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        selectedRoles: [],
    });

    const setSelectedRoles = (e) => {
        let items = data.selectedRoles

        items.push(e.target.value)

        setData('selectedRoles', items);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route('user.store'));
    }

    return (
        <AppLayout>
            <Head title="Tambah Pengguna"></Head>

            <Card className={"w-full xl:w-2/3"}>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        Tambah Pengguna
                    </div>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Name</label>
                                <TextInput className="w-full" placeholder={"Name"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    errors={errors.name}/>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Email</label>
                                <TextInput type="email" className="w-full" placeholder={"Email"} autoComplete="off"
                                    onChange={e => setData('email', e.target.value)}
                                    errors={errors.email}/>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Password</label>
                                <TextInput type="password" className="w-full" placeholder={"Password"} autoComplete="off"
                                    onChange={e => setData('password', e.target.value)}
                                    errors={errors.password}/>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Confirm Password</label>
                                <TextInput type="password" className="w-full" placeholder={"Confirm Password"} autoComplete="off"
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    errors={errors.password_confirmation}/>
                            </div>
                            
                            <div className="py-3 px-4 flex flex-col lg:col-span-2">
                                <div className={`p-4 rounded-t-lg border bg-white dark:bg-gray-950 dark:border-gray-900`}>
                                    <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-400'>
                                        Roles
                                    </div>
                                </div>
                                <div className='p-4 rounded-b-lg border border-t-0 bg-gray-100 dark:bg-gray-900 dark:border-gray-900'>
                                    <div className='flex flex-row flex-wrap gap-4'>
                                        {roles.map((role, i) => (
                                            <Checkbox label={role.name} value={role.name} onChange={setSelectedRoles} key={i}/>
                                        ))}
                                    </div>
                                    {errors.selectedRoles && <div className='text-xs text-red-500 mt-4'>{errors.selectedRoles}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pt-5 flex gap-2 justify-end">
                            <Button type={'submit'} style={'success'}>Simpan</Button>
                            <Button type={'link'} href={route('user.index')} style={'danger'}>Kembali</Button>
                        </div>

                        {success && (
                            <div className="mt-4 bg-teal-700 py-2 px-5 text-white rounded-lg flex items-center gap-2">
                                <CheckCircleIcon className="w-5"></CheckCircleIcon> {success}
                            </div>
                        )}
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}