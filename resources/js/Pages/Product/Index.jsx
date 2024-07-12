import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { CubeIcon, PencilIcon, TrashIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, products, categories, queryParams = null}) {

    queryParams = queryParams || {}

    console.log(products);
    return (
        <AppLayout>
            <Head title="Produk"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <CubeIcon className="w-6"/> Produk
                    </div>
                    <Button type={'link'} href={route('product.create')} style={'success'}>
                        <UserPlusIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} className={"w-1/2"}
                            name={'name'}
                            url={route('product.index')}
                            placeholder="Cari Produk"/>
                        <Search.Select queryParams={queryParams}
                            name={'category'}
                            url={route('product.index')}>
                            <option value="">- Pilih Kategori -</option>
                            {categories.data.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Search.Select>
                    </div>
                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('product.index')} queryParams={queryParams}>Produk</Table.Th>
                                <Table.Th name={'description'} sortable={true} url={route('product.index')} queryParams={queryParams}>Deskripsi</Table.Th>
                                <Table.Th name={'category_id'} sortable={true} url={route('product.index')} queryParams={queryParams}>Kategori</Table.Th>
                                <Table.Th name={'unit'} sortable={true} url={route('product.index')} queryParams={queryParams}>Satuan</Table.Th>
                                <Table.Th name={'weight'} sortable={true} url={route('product.index')} queryParams={queryParams}>Berat (Kg)</Table.Th>
                                <Table.Th name={'code'} sortable={true} url={route('product.index')} queryParams={queryParams}>Code</Table.Th>
                                <Table.Th name={'price'} sortable={false} url={route('product.index')} queryParams={queryParams}>Harga</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {products.data.map((product, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (products.meta.current_page-1) * products.meta.per_page}</Table.Td>
                                    <Table.Td>{product.name}</Table.Td>
                                    <Table.Td>{product.description}</Table.Td>
                                    <Table.Td>
                                        <span className="rounded-full px-1.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center justify-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
                                            {product.category.name}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className={'text-center'}>{product.unit}</Table.Td>
                                    <Table.Td className={'text-right'}>{product.weight}</Table.Td>
                                    <Table.Td>{product.code}</Table.Td>
                                    <Table.Td>Rp.{product.price}</Table.Td>
                                    <Table.Td className={'flex gap-1'}>
                                        <Button type={'link'} style={'info'} href={route('product.edit', product.id)}>
                                            <PencilIcon className="w-4"/>
                                        </Button>
                                        <Button type={'delete'} style={'danger'} url={route('product.destroy', product.id)}>
                                            <TrashIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
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