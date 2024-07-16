import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import AppLayout from "@/Layouts/AppLayout";
import { EyeIcon, InboxArrowDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import { NumericFormat } from "react-number-format";

export default function Index({auth, purchases, suppliers, queryParams = null}) {

    queryParams = queryParams || {}

    console.log(queryParams);

    return (
        <AppLayout>
            <Head title="Riwayat Pembelian"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <InboxArrowDownIcon className="w-6"/> Riwayat Pembelian
                    </div>
                    <Button type={'link'} href={route('purchase.create')} style={'success'}>
                        <PlusCircleIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} className={"w-1/2"}
                            name={'code'}
                            url={route('purchase.index')}
                            placeholder="Cari Kode"/>
                        <Search.Select queryParams={queryParams}
                            name={'supplier'}
                            url={route('purchase.index')}>
                            <option value="">- Pilih Supplier -</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            ))}
                        </Search.Select>
                    </div>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'name'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Kode Pembelian</Table.Th>
                                <Table.Th name={'description'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Supplier</Table.Th>
                                <Table.Th name={'category_id'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Jumlah</Table.Th>
                                <Table.Th name={'weight'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Total Harga</Table.Th>
                                <Table.Th name={'weight'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Diskon</Table.Th>
                                <Table.Th name={'weight'} sortable={true} url={route('purchase.index')} queryParams={queryParams}>Total Akhir</Table.Th>
                                <Table.Th name={'price'} sortable={false} url={route('purchase.index')} queryParams={queryParams}>Status</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {purchases.data.map((purchase, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (purchases.meta.current_page-1) * purchases.meta.per_page}</Table.Td>
                                    <Table.Td>{purchase.code}</Table.Td>
                                    <Table.Td>{purchase.supplier}</Table.Td>
                                    <Table.Td className={'text-right'}>{purchase.total_quantity}</Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={purchase.total_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={purchase.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={purchase.total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-center'}>{purchase.status}</Table.Td>
                                    <Table.Td className={'flex gap-1'}>
                                        <Button type={'link'} style={'info'} href={route('purchase.show', purchase.id)}>
                                            <EyeIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={purchases.meta.links}  align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}