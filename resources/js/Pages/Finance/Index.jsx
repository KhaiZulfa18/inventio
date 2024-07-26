import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Table from "@/Components/Table";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowPathIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, BanknotesIcon, Bars3Icon, CurrencyDollarIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";

export default function Index({auth}) {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [summary, setSummary] = useState();
    const [purchases, setPurchases] = useState();
    const [sales, setSales] = useState();

    const [date, setDate] = useState({
        endDate: null,
        startDate: null,
    });

    const searchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('finance.data'), {
                params: {
                    date: date,
                },
                paramsSerializer: {
                    indexes: true,
                }
            });
            setSummary(response.data.data.summary);
            setPurchases(response.data.data.purchases);
            setSales(response.data.data.sales);
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
            <Head title="Laporan Keuangan"></Head>

            <Card>
                <Card.Header>
                    <BanknotesIcon className="w-5"/> Laporan Keuangan
                </Card.Header>
                <Card.Body>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="py-3 px-2 flex flex-col gap-2">
                            <label className="text-sm">Pilih Periode</label>
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
                    {summary && 
                        <div className="mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                                <ArrowTrendingUpIcon className="w-6 h-6 text-green-500 mr-3"/>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Pendapatan</h2>
                                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        <NumericFormat value={ summary.income} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                                <ArrowTrendingDownIcon className="w-6 h-6 text-red-500 mr-3"/>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total Pengeluaran</h2>
                                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        <NumericFormat value={ summary.outcome} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                                <CurrencyDollarIcon className="w-6 h-6 text-green-500 mr-3"/>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Laba</h2>
                                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        <NumericFormat value={ summary.profit} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center">
                                <CurrencyDollarIcon className="w-6 h-6 text-red-500 mr-3"/>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rugi</h2>
                                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        <NumericFormat value={ summary.loss} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    }

                    {sales && 
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th colSpan={7}>Pendapatan</Table.Th>
                                </tr>
                                <tr>
                                    <Table.Th>No.</Table.Th>
                                    <Table.Th>Tgl Penjualan</Table.Th>
                                    <Table.Th>Kode Penjualan</Table.Th>
                                    <Table.Th>Total</Table.Th>
                                    <Table.Th>Diskon</Table.Th>
                                    <Table.Th>Total Pendapatan</Table.Th>
                                    <Table.Th>#</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {sales.map((sale, index) => (
                                    <tr>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td>{sale.date}</Table.Td>
                                        <Table.Td>{sale.code}</Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={sale.total_price} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={sale.discount} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={sale.total} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className={'flex gap-1 justify-end'}>
                                            {sale.code && (
                                            <Button type={'link'} style={'secondary'} href={route('sale.show', encodeURIComponent(sale.code))}>
                                                <Bars3Icon className="w-4"/>
                                            </Button>
                                            )}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    }
                    <br></br>
                    {purchases && 
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th colSpan={7}>Pengeluaran</Table.Th>
                                </tr>
                                <tr>
                                    <Table.Th>No.</Table.Th>
                                    <Table.Th>Tgl Pembelian</Table.Th>
                                    <Table.Th>Kode Pembelian</Table.Th>
                                    <Table.Th>Total</Table.Th>
                                    <Table.Th>Diskon</Table.Th>
                                    <Table.Th>Total Pengeluaran</Table.Th>
                                    <Table.Th>#</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {purchases.map((purchase, index) => (
                                    <tr>
                                        <Table.Td>{index + 1}</Table.Td>
                                        <Table.Td>{purchase.date}</Table.Td>
                                        <Table.Td>{purchase.code}</Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={purchase.total_price} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={purchase.discount} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={purchase.total} displayType={'text'} prefix="Rp." thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/></Table.Td>
                                        <Table.Td className={'flex gap-1 justify-end'}>
                                            {purchase.code && (
                                                <Button type={'link'} style={'secondary'} href={route('purchase.show', encodeURIComponent(purchase.code))}>
                                                    <Bars3Icon className="w-4"/>
                                                </Button>
                                            )}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    }
                </Card.Body>
            </Card>
        </AppLayout>
    )
}