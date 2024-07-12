import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import Table from "@/Components/Table";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { InboxArrowDownIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({auth}) {

    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
        category: '',
        unit: '',
        weight: '',
        code: '',
        price: '',
    });

    const [rows, setRows] = useState([
        {id: 1, product_id: '', product_name: '', qty: '', price: '', weight: '', unit: ''}
    ]);

    const addRows = () => {
        const newRow = {id: 1, product_id: '', product_name: '', qty: '', price: '', weight: '', unit: ''}
        
        setRows([...rows,newRow]);
    }

    const deleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);

        setRows(newRows);
    }

    return (
        <AppLayout>
            <Head title="Pembelian"></Head>

            <Card>
                <Card.Header>
                    <InboxArrowDownIcon className="w-6"/> Pembelian
                </Card.Header>
                <Card.Body>
                    <form onSubmit='' >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Tanggal Pembelian</label>
                                <TextInput className="w-full" placeholder={"Tgl Pembelian"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Supplier</label>
                                <TextInput className="w-full" placeholder={"Supplier"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Metode Pembayaran</label>
                                <TextInput className="w-full" placeholder={"Metode Pembayaran"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Note</label>
                                <TextArea></TextArea>
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                        </div>
                        {/* <div className="w-full py-2 px-3 text-center">
                            <span className="uppercase">Daftar Produk</span>
                        </div> */}
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th colspan='8' className="text-center">Daftar Produk</Table.Th>
                                </tr>
                                <tr>
                                    <Table.Th className={'w-10'}>No</Table.Th>
                                    <Table.Th className={'w-10'}>Produk</Table.Th>
                                    <Table.Th className={'w-10'}>Jumlah</Table.Th>
                                    <Table.Th className={'w-10'}>Harga</Table.Th>
                                    <Table.Th className={'w-10'}>Total Harga</Table.Th>
                                    <Table.Th className={'w-10'}>Berat</Table.Th>
                                    <Table.Th className={'w-10'}>Total Berat</Table.Th>
                                    <Table.Th className={'w-10'}>Aksi</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows.map((row,index) => (
                                    <tr key={index}>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td>{row.product_id} + {index}</Table.Td>
                                        <Table.Td className={'text-center'}>
                                            <Button type={'button'} style={'danger'} onClick={() => deleteRow(index)}>
                                                <TrashIcon className="w-4"/>
                                            </Button>
                                        </Table.Td>
                                    </tr>
                                ))}
                                <tr>
                                    <Table.Td colspan='8'>
                                        <Button type={'button'} style={'primary'} onClick={addRows}>
                                            <PlusIcon className="w-4"/> Tambah Produk
                                        </Button>
                                    </Table.Td>
                                </tr>
                            </Table.Tbody>
                        </Table>
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}