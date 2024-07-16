import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import SelectSearch from "@/Components/SelectSearch";
import StepperInput from "@/Components/StepperInput";
import Table from "@/Components/Table";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { InboxArrowDownIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from 'react-select';

export default function Create({auth, products}) {

    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
        category: '',
        qty: '',
        unit: '',
        weight: '',
        code: '',
        price: '',
    });

    const [rows, setRows] = useState([
        {product_id: '', product_name: '', qty: 0, price: 0, weight: 0, total_price: 0, total_weight: 0, unit: ''}
    ]);

    const addRows = () => {
        const newRow = {product_id: '', product_name: '', qty: 0, price: 0, weight: 0, total_price: 0, total_weight: 0, unit: ''}
        
        setRows([...rows,newRow]);
    }

    const deleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);

        setRows(newRows);
    }

    const chooseProduct = (e, index) => {
        const product_id = e.value;

        const product = products.data.find((product) => product.id == product_id);

        const updatedRows = rows.map((row, i) => 
            i === index ? { 
                ...row, 
                product_id, 
                qty: row.qty ? row.qty : 1,
                product_name: product ? product.name : '', 
                price: product ? product.price : 0, 
                weight: product ? product.weight : 0,
                total_price: product ? (product.price * (row.qty ? row.qty : 1)) : 0,
                total_weight: product ? (product.weight * (row.qty ? row.qty : 1)) : 0,
            } : row
        );
        setRows(updatedRows);
    }

    const setQuantity = (e, index) => {
        const qty = parseInt(e.target.value) || 0;
    
        const updatedRows = rows.map((row, i) => 
            i === index ? {
                ...row,
                qty,
                total_price: row.price ? (row.price * qty) : 0,
                total_weight: row.weight ? (row.weight * qty) : 0,
            } : row
        );
    
        setRows(updatedRows);
    };

    const getTotal = (data,key) => {
        return data.reduce((total, row) => {
            return total + row[key];
        }, 0);
    }

    const productOptions = products.data.map(product => ({
        value: product.id,
        label: product.name
    }));

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
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th colSpan='8' className="text-center">Daftar Produk</Table.Th>
                                </tr>
                                <tr>
                                    <Table.Th className={'w-1/12'}>No</Table.Th>
                                    <Table.Th className={'w-1/4'}>Produk</Table.Th>
                                    <Table.Th className={''}>Jumlah</Table.Th>
                                    <Table.Th>Harga</Table.Th>
                                    <Table.Th>Total Harga</Table.Th>
                                    <Table.Th>Berat</Table.Th>
                                    <Table.Th>Total Berat</Table.Th>
                                    <Table.Th>Aksi</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows.map((row,index) => (
                                    <tr key={index}>
                                        <Table.Td className="text-center">{index + 1}</Table.Td>
                                        <Table.Td>
                                            <SelectSearch 
                                            options={productOptions}
                                            onChange={(e) => chooseProduct(e,index)}
                                            placeholder="- Pilih Produk -"
                                            menuPosition={'fixed'}
                                            menuPlacement={'auto'}
                                            />
                                        </Table.Td>
                                        <Table.Td>
                                            <StepperInput value={row.qty} onChange={(e) => setQuantity(e,index)}/>
                                        </Table.Td>
                                        <Table.Td>{row.price}</Table.Td>
                                        <Table.Td>{row.total_price.toFixed(2)}</Table.Td>
                                        <Table.Td>{row.weight}</Table.Td>
                                        <Table.Td>{row.total_weight.toFixed(2)}</Table.Td>
                                        <Table.Td className={'text-center'}>
                                            <Button type={'button'} style={'danger'} onClick={() => deleteRow(index)}>
                                                <TrashIcon className="w-4"/>
                                            </Button>
                                        </Table.Td>
                                    </tr>
                                ))}
                                <tr>
                                    <Table.Td colSpan='8'>
                                        <Button type={'button'} style={'primary'} onClick={addRows}>
                                            <PlusIcon className="w-4"/> Tambah Produk
                                        </Button>
                                    </Table.Td>
                                </tr>
                                <tr>
                                   <Table.Td colSpan='2'>Total {rows.length} Produk</Table.Td> 
                                   <Table.Td >{getTotal(rows,'qty')}</Table.Td> 
                                   <Table.Td ></Table.Td> 
                                   <Table.Td >{(getTotal(rows,'total_price')).toFixed(2)}</Table.Td> 
                                   <Table.Td ></Table.Td> 
                                   <Table.Td >{(getTotal(rows,'total_weight')).toFixed(2)}</Table.Td> 
                                   <Table.Td ></Table.Td> 
                                </tr>
                            </Table.Tbody>
                        </Table>
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}