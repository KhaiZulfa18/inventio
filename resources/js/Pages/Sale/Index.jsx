import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/SearchInput";
import Table from "@/Components/Table";
import useToast from "@/Hooks/useToast";
import AppLayout from "@/Layouts/AppLayout";
import { Bars3Icon, InboxArrowDownIcon, PlusCircleIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";

export default function Index({auth, sales, customers, queryParams = null}) {

    queryParams = queryParams || {}

    const { props } = usePage();
    const { showToast } = useToast();

    useEffect(() => {
        if (props.flash && props.flash.success) {
            showToast(props.flash.success, 'success');
        }
        if (props.flash && props.flash.error) {
            showToast(props.flash.error, 'error');
        }
    }, [props.flash]);

    return (
        <AppLayout>
            <Head title="Riwayat Penjualan"></Head>

            <Card>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        <ShoppingCartIcon className="w-6"/> Riwayat Penjualan
                    </div>
                    <Button type={'link'} href={route('sale.create')} style={'success'}>
                        <PlusCircleIcon className="w-5"/><span className="hidden lg:block">Tambah</span>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div className="py-2 w-full flex items-center justify-start gap-1">
                        <Search.Input queryParams={queryParams} className={"w-1/2"}
                            name={'code'}
                            url={route('sale.index')}
                            placeholder="Cari Kode"/>
                        <Search.Select queryParams={queryParams}
                            name={'customer'}
                            url={route('sale.index')}>
                            <option value="">- Pilih Pelanggan -</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </Search.Select>
                    </div>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th name={'code'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Kode Penjualan</Table.Th>
                                <Table.Th name={'customer'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Pelanggan</Table.Th>
                                <Table.Th name={'total_quantity'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Jumlah</Table.Th>
                                <Table.Th name={'total_price'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Total Harga</Table.Th>
                                <Table.Th name={'discount'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Diskon</Table.Th>
                                <Table.Th name={'total'} sortable={true} url={route('sale.index')} queryParams={queryParams}>Total Akhir</Table.Th>
                                <Table.Th name={'status'} sortable={false} url={route('sale.index')} queryParams={queryParams}>Status</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {sales.data.map((sale, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (sales.meta.current_page-1) * sales.meta.per_page}</Table.Td>
                                    <Table.Td>{sale.code}</Table.Td>
                                    <Table.Td>{sale.customer}</Table.Td>
                                    <Table.Td className={'text-right'}>{sale.total_quantity}</Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={sale.total_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={sale.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-right'}>
                                        <NumericFormat value={sale.total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                                decimalScale={2}
                                                fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td className={'text-center'}>{sale.status}</Table.Td>
                                    <Table.Td className={'flex gap-1 justify-end'}>
                                        {sale.code && (
                                        <Button type={'link'} style={'secondary'} href={route('sale.show', encodeURIComponent(sale.code))}>
                                            <Bars3Icon className="w-4"/>
                                        </Button>
                                        )}
                                        <Button type={'delete'} style={'danger'} url={route('sale.destroy', sale.id)}>
                                            <TrashIcon className="w-4"/>
                                        </Button>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={sales.meta.links}  align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}