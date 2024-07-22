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
import { InboxArrowDownIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";

export default function Create({auth, products, customers}) {

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

    const {data, setData, post, errors} = useForm({
        date: '',
        customer: '',
        payment_method: '',
        note: '',
        discount: 0,
        products: []
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(totalPrice - discount);
        setData('discount',discount);
    }, [totalPrice, discount]);

    const [dateValue, setDateValue] = useState({
        endDate: null,
        startDate: null,
    });

    useEffect(() => {
        setData('date',dateValue.startDate);
    }, [dateValue]);

    const [rows, setRows] = useState([
        {product_id: '', product_name: '', qty: 0, price: 0, weight: 0, total_price: 0, total_weight: 0, unit: ''}
    ]);

    useEffect(() => {
        setTotalPrice(getTotal(rows,'total_price'));
        setData('products',rows);
    }, [rows])

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
                price: product ? product.price_sale : 0, 
                weight: product ? product.weight : 0,
                total_price: product ? (product.price_sale * (row.qty ? row.qty : 1)) : 0,
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

    const customerOptions = customers.map(customer => ({
        value: customer.id,
        label: customer.name
    }));

    const onSubmit = async (e) => {
        e.preventDefault();
        
        post(route('sale.store'));
    }

    return (
        <AppLayout>
            <Head title="Penjualan"></Head>

            <Card>
                <Card.Header>
                    <ShoppingCartIcon className="w-6"/> Penjualan
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-3">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Tanggal Penjualan</label>
                                <Datepicker placeholder={"Tgl Penjualan"} 
                                    asSingle={true} 
                                    useRange={false} 
                                    showShortcuts={true} 
                                    configs={{
                                        shortcuts: {
                                        today: "Hari ini", 
                                        yesterday: "Kemarin",
                                    }}}
                                    value={dateValue}
                                    onChange={(value) => setDateValue(value)}/>
                                <InputError message={errors.date} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Pelanggan</label>
                                <SelectSearch creatable={true} placeholder={'- Pilih atau Buat Pelanggan -'}
                                    options={customerOptions}
                                    onChange={e => setData('customer', e.value)}/>
                                <InputError message={errors.customer} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Metode Pembayaran</label>
                                <SelectInput onChange={e => setData('payment_method', e.target.value)}>
                                    <option value={''}>- Metode Pembayaran -</option>
                                    <option value={'cash'}>Cash</option>
                                    <option value={'debit'}>Debit</option>
                                    <option value={'qris'}>QRIS</option>
                                </SelectInput>
                                <InputError message={errors.payment_method} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Note</label>
                                <TextArea onChange={(e) => setData('note', e.target.value)}></TextArea>
                                <InputError message={errors.note} className="mt-2"></InputError>
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
                                   <Table.Td >
                                        <NumericFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                   </Table.Td> 
                                   <Table.Td ></Table.Td> 
                                   <Table.Td >
                                        <NumericFormat value={getTotal(rows,'total_weight')} displayType={'text'} thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                   </Table.Td> 
                                   <Table.Td ></Table.Td> 
                                </tr>
                                <tr>
                                    <Table.Td colSpan="2">Potongan / Diskon</Table.Td>
                                    <Table.Td><TextInput type={'number'} placeholder={'Potongan Harga'} onChange={(e) => setDiscount(e.target.value)}/>
                                    </Table.Td>
                                    <Table.Td colSpan=""></Table.Td>
                                    <Table.Td colSpan="">
                                        <NumericFormat value={discount} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td colSpan="3"></Table.Td>
                                </tr>
                                <tr>
                                    <Table.Td colSpan="4">Total Akhir</Table.Td>
                                    <Table.Td colSpan="2">
                                        <NumericFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} 
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td>
                                    <Table.Td >
                                        <NumericFormat value={getTotal(rows,'total_weight')} displayType={'text'} thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                    </Table.Td> 
                                    <Table.Td colSpan=""></Table.Td>
                                </tr>
                            </Table.Tbody>
                        </Table>
                        <div className="flex items-center justify-end mt-3">
                            <Button type={'submit'} style={'success'}>
                                 Simpan
                            </Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}