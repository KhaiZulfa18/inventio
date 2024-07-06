import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { PencilIcon, TrashIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, categories, queryParams = null}) {

    queryParams = queryParams || {}

    return (
        <AppLayout>
            <Head title="Kategori"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <UserGroupIcon className="w-6"/> Kategori
                    </div>
                    <Button type={'link'} href={route('category.create')} style={'success'}>
                        <UserPlusIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} 
                            name={'name'}
                            url={route('category.index')}
                            placeholder="Cari Kategori atau Deskripsi"/>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('category.index')} queryParams={queryParams}>Kategori</Table.Th>
                                <Table.Th name={'description'} sortable={true} url={route('category.index')} queryParams={queryParams}>Deskripsi</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {categories.data.map((category, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (categories.meta.current_page-1) * categories.meta.per_page}</Table.Td>
                                    <Table.Td>{category.name}</Table.Td>
                                    <Table.Td>{category.description}</Table.Td>
                                    <Table.Td className={'flex gap-1'}>
                                        <Button type={'link'} style={'info'} href={route('category.edit', category.id)}>
                                            <PencilIcon className="w-4"/>
                                        </Button>
                                        <Button type={'delete'} style={'danger'} url={route('category.destroy', category.id)}>
                                            <TrashIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={categories.meta.links} align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}