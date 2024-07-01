import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { PlusCircleIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, users, queryParams = null}) {

    queryParams = queryParams || {}

    return (
        <AppLayout>
            <Head title="Pengguna"></Head>

            <Card>
                <Card.Header title="Pengguna" className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <UserGroupIcon className="w-6"/> Pengguna
                    </div>
                    <PrimaryButton><UserPlusIcon className="w-5" />&nbsp;Tambah</PrimaryButton>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} 
                            name={'name'}
                            url={route('user.index')}
                            placeholder="Cari Nama atau Email"/>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('user.index')} queryParams={queryParams}>Nama Pengguna</Table.Th>
                                <Table.Th name={'email'} sortable={true} url={route('user.index')} queryParams={queryParams}>Email</Table.Th>
                                <Table.Th>Group Akses</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {users.data.map((user, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (users.meta.current_page-1) * users.meta.per_page}</Table.Td>
                                    <Table.Td>{user.name}</Table.Td>
                                    <Table.Td>{user.email}</Table.Td>
                                    <Table.Td>
                                        <div className='flex flex-wrap gap-2'>
                                            {user.roles && user.roles.map((role, index) => (
                                                <span className="rounded-full px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20" key={index}>
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td><PrimaryButton>Hapus</PrimaryButton></Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={users.meta.links}  align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}