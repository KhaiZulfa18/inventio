import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { PencilIcon, TrashIcon, UserGroupIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Head, useForm, router } from "@inertiajs/react";
import ListBox from "@/Components/ListBox";

export default function Index({auth, roles, permissions, queryParams = null}) {

    queryParams = queryParams || {}

    const { data, setData, transform, post, errors} = useForm({
        id: '',
        name: '',
        selectedPermission : [],
        isUpdate: false,
        isOpen: false,
    });

    const setSelectedPermission = (value) => {
        setData('selectedPermission', value)
    }

    transform((data) => ({
        ...data,
        selectedPermission: data.selectedPermission.map(permission => permission.id),
        _method : data.isUpdate === true ? 'put' : 'post'
    }))

    const saveRole = async (e) => {
        e.preventDefault();

        post(route('role.store'), {
            onSuccess: () => {
                setData({
                    selectedPermission : [],
                    name: '',
                    isOpen: false,
                })
            }
        });
    }

    const updateRole = async (e) => {
        e.preventDefault();

        post(route('role.update', data.id), {
            onSuccess : () => {
                setData({
                    id : '',
                    name : '',
                    selectedPermission : [],
                    isUpdate : false,
                    isOpen: false,
                });
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Group Akses"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <UsersIcon className="w-6"/> Group Akses
                    </div>
                    <Button type={'modal'} style={'success'} onClick={(e) => setData('isOpen', true)}>
                        <UserPlusIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} 
                            name={'name'}
                            url={route('role.index')}
                            placeholder="Cari Group Akses"/>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('role.index')} queryParams={queryParams}>Nama</Table.Th>
                                <Table.Th>Hak Akses</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {roles.data.map((role, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (roles.current_page-1) * roles.per_page}</Table.Td>
                                    <Table.Td>{role.name}</Table.Td>
                                    <Table.Td>
                                        <div className='flex flex-wrap gap-2'>
                                            {role.permissions && role.permissions.map((permission, index) => (
                                                <span className="rounded-full px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20" key={index}>
                                                    {permission.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td className={'flex gap-1'}>
                                        <Button type={'modal'} style={'info'} 
                                            onClick={() =>
                                                setData({
                                                    id: role.id,
                                                    selectedPermission: role.permissions,
                                                    name: role.name,
                                                    isUpdate: true,
                                                    isOpen : !data.isOpen,
                                                })
                                            }>
                                            <PencilIcon className="w-4"/>
                                        </Button>
                                        <Button type={'delete'} style={'danger'} url={route('role.destroy', role.id)}>
                                            <TrashIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={roles.links}  align="c"/>
                </Card.Body>
            </Card>
            <Modal show={data.isOpen}
                onClose={() =>
                    setData({
                        isOpen : false,
                        id: '',
                        name: '',
                        selectedPermission : [],
                        isUpdate : false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Group Akses' : 'Tambah Data Group Akses'}`}>
                <form onSubmit={data.isUpdate === true ? updateRole : saveRole}>
                    <div className='mb-4'>
                        <TextInput placeholder='Nama Group Akses' className="w-full" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name}  />
                    </div>
                    <div className='mb-4'>
                        <ListBox
                            label={'Pilih hak akses'}
                            data={permissions}
                            selected={data.selectedPermission}
                            setSelected={setSelectedPermission}
                            errors={errors.selectedPermission}
                        />
                    </div>
                    <Button
                        type={'submit'}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}>
                            Simpan
                    </Button>
                </form>
            </Modal>
        </AppLayout>
    );
}