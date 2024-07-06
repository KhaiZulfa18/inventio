import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { FingerPrintIcon, PencilIcon, TrashIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import ListBox from "@/Components/ListBox";

export default function Index({auth, roles, permissions, queryParams = null}) {

    queryParams = queryParams || {}

    const { data, setData, transform, post, errors} = useForm({
        id: '',
        name: '',
        isUpdate: false,
        isOpen: false,
    });

    transform((data) => ({
        ...data,
        _method : data.isUpdate === true ? 'put' : 'post'
    }))

    const saveRole = async (e) => {
        e.preventDefault();

        post(route('permission.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    isOpen: false,
                })
            }
        });
    }

    const updateRole = async (e) => {
        e.preventDefault();

        post(route('permission.update', data.id), {
            onSuccess : () => {
                setData({
                    id : '',
                    name : '',
                    isUpdate : false,
                    isOpen: false,
                });
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Hak Akses"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <FingerPrintIcon className="w-6"/> Hak Akses
                    </div>
                    <Button type={'modal'} style={'success'} onClick={(e) => setData('isOpen', true)}>
                        <UserPlusIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} 
                            name={'name'}
                            url={route('permission.index')}
                            placeholder="Cari Hak Akses"/>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('permission.index')} queryParams={queryParams}>Nama</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {permissions.data.map((permission, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (permissions.current_page-1) * permissions.per_page}</Table.Td>
                                    <Table.Td>{permission.name}</Table.Td>
                                    <Table.Td className={'flex gap-1 justify-center'}>
                                        <Button type={'modal'} style={'info'} 
                                            onClick={() =>
                                                setData({
                                                    id: permission.id,
                                                    name: permission.name,
                                                    isUpdate: true,
                                                    isOpen : !data.isOpen,
                                                })
                                            }>
                                            <PencilIcon className="w-4"/>
                                        </Button>
                                        <Button type={'delete'} style={'danger'} url={route('permission.destroy', permission.id)}>
                                            <TrashIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={permissions.links}  align="c"/>
                </Card.Body>
            </Card>
            <Modal show={data.isOpen}
                onClose={() =>
                    setData({
                        isOpen : false,
                        id: '',
                        name: '',
                        isUpdate : false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Hak Akses' : 'Tambah Data Hak Akses'}`}>
                <form onSubmit={data.isUpdate === true ? updateRole : saveRole}>
                    <div className='mb-4'>
                        <TextInput placeholder='Nama Hak Akses' className="w-full" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name}  />
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