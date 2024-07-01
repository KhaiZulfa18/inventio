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

export default function Index({auth, products, queryParams = null}) {

    queryParams = queryParams || {}

    return (
        <AppLayout>
            <Head title="Pengguna"></Head>

            <Card>
                <Card.Header title="Pengguna" className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <UserGroupIcon className="w-6"/> Kategori
                    </div>
                    <PrimaryButton><UserPlusIcon className="w-5" />&nbsp;Tambah</PrimaryButton>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} 
                            name={'name'}
                            url={route('product.index')}
                            placeholder="Cari Produk"/>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('product.index')} queryParams={queryParams}>Kategori</Table.Th>
                                <Table.Th name={'description'} sortable={true} url={route('product.index')} queryParams={queryParams}>Deskripsi</Table.Th>
                                <Table.Th name={'category_id'} sortable={true} url={route('product.index')} queryParams={queryParams}>Kategori</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {products.data.map((product, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (products.meta.current_page-1) * products.meta.per_page}</Table.Td>
                                    <Table.Td>{product.name}</Table.Td>
                                    <Table.Td>{product.description}</Table.Td>
                                    <Table.Td>{product.category.name}</Table.Td>
                                    <Table.Td><PrimaryButton>Hapus</PrimaryButton></Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={products.meta.links}  align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}