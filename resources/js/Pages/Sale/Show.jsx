import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import SelectSearch from "@/Components/SelectSearch";
import StepperInput from "@/Components/StepperInput";
import Table from "@/Components/Table";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import useToast from "@/Hooks/useToast";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowLeftIcon, InboxArrowDownIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, useForm, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";

export default function Create({auth, sales}) {

    console.log(sales);
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

    const getTotal = (data,key) => {
        return data.reduce((total, row) => {
            return total + row[key];
        }, 0);
    }

    return (
        <AppLayout>
            <Head title={clsx(sales.data.code)}></Head>

            <Card>
                <Card.Header>
                    <ShoppingCartIcon className="w-6"/> Detail Pembelian {sales.data.code}
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-3">
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Tanggal Pembelian</label>
                            <span className="rounded-lg px-3 py-0.5 text-lg tracking-wide font-bold border border-gray-500">{sales.data.date}</span>
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Pelanggan</label>
                            <span className="rounded-lg px-3 py-0.5 text-lg tracking-wide font-bold border border-gray-500">{sales.data.customer}</span>
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Metode Pembayaran</label>
                            <span className="rounded-lg px-3 py-0.5 text-lg tracking-wide font-bold border border-gray-500">{sales.data.payment_method}</span>
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Note</label>
                            <span className="rounded-lg px-3 py-0.5 text-lg tracking-wide font-bold border border-gray-500">{sales.data.note}</span>
                        </div>
                    </div>
                    <Table className={'mt-3 md:mt-1'}>
                        <Table.Thead>
                            <tr>
                                <Table.Th colSpan='8' className="text-center">
                                    Daftar Produk
                                </Table.Th>
                            </tr>
                            <tr>
                                <Table.Th className={'w-1/12'}>No</Table.Th>
                                <Table.Th className={'w-1/4'}>Produk</Table.Th>
                                <Table.Th className={''}>Jumlah</Table.Th>
                                <Table.Th>Harga</Table.Th>
                                <Table.Th>Total Harga</Table.Th>
                                <Table.Th>Berat</Table.Th>
                                <Table.Th>Total Berat</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {sales.data.transactions.map((row,index) => (
                                <tr key={index}>
                                    <Table.Td className="text-center">{index + 1}</Table.Td>
                                    <Table.Td>{row.product.name}</Table.Td>
                                    <Table.Td>{row.quantity}</Table.Td>
                                    <Table.Td>
                                        <NumericFormat value={row.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td>
                                        <NumericFormat value={row.total_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td>
                                        <NumericFormat value={row.weight} displayType={'text'} thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td>
                                        <NumericFormat value={row.total_weight} displayType={'text'} thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                </tr>
                            ))}
                            <tr>
                                <Table.Td colSpan='2'>Total {sales.data.transactions.length} Produk</Table.Td> 
                                <Table.Td >{sales.data.total_quantity}</Table.Td> 
                                <Table.Td ></Table.Td> 
                                <Table.Td >
                                    <NumericFormat value={sales.data.total_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                        decimalScale={2}
                                        fixedDecimalScale={true}/>
                                </Table.Td> 
                                <Table.Td ></Table.Td> 
                                <Table.Td >
                                    <NumericFormat value={getTotal(sales.data.transactions,'total_weight')} displayType={'text'} thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}/>
                                </Table.Td> 
                            </tr>
                            <tr>
                                <Table.Td colSpan="4">Potongan / Diskon</Table.Td>
                                <Table.Td colSpan="">
                                    <NumericFormat value={sales.data.discount} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                        decimalScale={2}
                                        fixedDecimalScale={true}/>
                                </Table.Td>
                                <Table.Td colSpan="2"></Table.Td>
                            </tr>
                            <tr>
                                <Table.Td colSpan="4">Total Akhir</Table.Td>
                                <Table.Td colSpan="2">
                                    <NumericFormat value={sales.data.total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                        decimalScale={2}
                                        fixedDecimalScale={true}/>
                                </Table.Td>
                                <Table.Td >
                                    <NumericFormat value={getTotal(sales.data.transactions,'total_weight')} displayType={'text'} thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}/>
                                </Table.Td> 
                            </tr>
                        </Table.Tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <Button type={'link'} style={'success'} href={route('sale.index')} className={'inline-flex items-center'}>
                        <ArrowLeftIcon className="w-3"/> Kembali
                    </Button>
                </Card.Footer>
            </Card>
        </AppLayout>
    )
}