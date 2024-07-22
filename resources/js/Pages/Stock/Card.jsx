import Button from "@/Components/Button";
import Card from "@/Components/Card";
import SelectSearch from "@/Components/SelectSearch";
import Table from "@/Components/Table";
import useToast from "@/Hooks/useToast";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowPathIcon, FaceFrownIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";

export default function Report({products}) {

   const [product, setProduct] = useState();
   const [data, setData] = useState();
   const [loading, setLoading] = useState(false);

   const { showToast } = useToast();

   const [date, setDate] = useState({
        endDate: null,
        startDate: null,
    });

    const productOptions = products.data.map(product => ({
        value: product.id,
        label: product.name
    }));

    const searchData = async () => {
        if (!date.startDate || !product) {
            showToast('Silahkan pilih Produk & Tanggal terlebih dahulu','error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(route('stock.card.data', product), {
                params: {
                    date: date,
                },
                paramsSerializer: {
                    indexes: true,
                }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const getTotal = (data,key) => {
        return data.reduce((total, row) => {
            return total + row[key];
        }, 0);
    }

    return (
        <AppLayout>
            <Head title="Kartu Stok"></Head>

            <Card>
                <Card.Header>
                    <Square3Stack3DIcon className="w-6"/> Kartu Stok
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-3">
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Produk</label>
                            <SelectSearch placeholder={'- Pilih Produk -'}
                                options={productOptions}
                                onChange={(selected) => setProduct(selected.value)}
                                />
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Stok per tanggal :</label>
                            <Datepicker placeholder={"Tanggal Awal dan Tanggal Akhir"} 
                                showShortcuts={true} 
                                configs={{
                                    shortcuts: {
                                    today: "Hari ini", 
                                    yesterday: "Kemarin",
                                }}}
                                value={date}
                                onChange={(value) => setDate(value)}
                            />
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <br className="hidden md:block" />
                            <Button type={'button'} style={'success'} className={'inline-flex w-auto self-start'}
                                onClick={searchData}>
                                {loading ? (
                                    <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" />
                                ) : (
                                    <MagnifyingGlassCircleIcon className="w-5 h-5 mr-2" />
                                )}
                                Tampilkan
                            </Button>
                        </div>
                    </div>
                    {!data && 
                        <div className="flex items-center justify-center px-4 py-5 md:px-6 md:py-10 rounded-lg border border-dotted border-gray-500/40">
                            <span className="text-md md:text-2xl text-gray-500 tracking-wider">Silahkan Pilih Periode Tanggal Stok dan Produk</span>
                        </div>
                    }
                    {data && (
                        <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-3">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label className="text-sm">Kategori</label>
                                <span className="rounded-lg px-0.5 py-0.5 text-lg tracking-wide font-bold">{data.product.category.name}</span>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label className="text-sm">Harga</label>
                                <span className="rounded-lg px-0.5 py-0.5 text-lg tracking-wide font-bold">
                                    <NumericFormat value={ data.product.price} displayType={'text'} thousandSeparator={true} prefix="Rp."
                                            decimalScale={2}
                                            fixedDecimalScale={true}/>
                                </span>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label className="text-sm">Berat / {data.product.unit}</label>
                                <span className="rounded-lg px-0.5 py-0.5 text-lg tracking-wide font-bold">
                                    <NumericFormat value={ data.product.weight} displayType={'text'} thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}/> Kg
                                </span>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label className="text-sm">Deskripsi</label>
                                <span className="rounded-lg px-0.5 py-0.5 text-lg tracking-wide font-bold">{data.product.description}</span>
                            </div>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th colSpan='4' className="bg-gray-50 dark:bg-gray-900">Sisa Awal</Table.Th>
                                    <Table.Th className="text-right bg-gray-50 dark:bg-gray-900">
                                            <NumericFormat value={ data.start_stock} displayType={'text'} thousandSeparator={true}
                                                decimalScale={0}
                                                fixedDecimalScale={true}/>
                                    </Table.Th>
                                </tr>
                                <tr>
                                    <Table.Th>Tanggal</Table.Th>
                                    <Table.Th>Code</Table.Th>
                                    <Table.Th>Masuk</Table.Th>
                                    <Table.Th>Keluar</Table.Th>
                                    <Table.Th>Sisa</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.transactions.length > 0 ? (
                                    data.transactions.map((stock, index) => (
                                        <tr key={index}>
                                            <Table.Td>{ stock.date }</Table.Td>
                                            <Table.Td>{ stock.code }</Table.Td>
                                            <Table.Td className="text-right">
                                                <NumericFormat value={ stock.in_stock} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                            </Table.Td>
                                            <Table.Td className="text-right">
                                                <NumericFormat value={ stock.out_stock} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                            </Table.Td>
                                            <Table.Td className="text-right">
                                                <NumericFormat value={ stock.remain_stock} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={5} message={'Data tidak ditemukan'} className="text-gray-500 text-lg">
                                        <FaceFrownIcon className="w-auto text-gray-500"></FaceFrownIcon>
                                    </Table.Empty>
                                )}
                                {data.transactions.length > 0 && (
                                    <tr>
                                        <Table.Td colSpan='4'>Total {data.transactions.length} Data</Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={ getTotal(data.transactions, 'remaining_stock')} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                        </Table.Td>
                                    </tr>
                                )}
                            </Table.Tbody>
                        </Table>
                        </>
                    )}
                </Card.Body>
            </Card>
        </AppLayout>
    );
}