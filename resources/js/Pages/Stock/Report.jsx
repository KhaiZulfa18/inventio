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

export default function Report({categories}) {

   const [date, setDate] = useState();
   const [category, setCategory] = useState([]);
   const [data, setData] = useState();
   const [loading, setLoading] = useState(false);

   const { showToast } = useToast();

   const [dateValue, setDateValue] = useState({
        endDate: null,
        startDate: null,
    });

    useEffect(() => {
        setDate(dateValue.startDate);
    }, [dateValue]);

    const categoryOptions = categories.data.map(category => ({
        value: category.id,
        label: category.name
    }));

    const searchData = async () => {
        if (!date) {
            showToast('Silahkan pilih Tanggal terlebih dahulu','error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(route('stock.report.data'), {
                params: {
                    date: date,
                    category_id: category
                },
                paramsSerializer: {
                    indexes: true,
                }
            });
            setData(response.data.data);
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
            <Head title="Sisa Stok"></Head>

            <Card>
                <Card.Header>
                    <Square3Stack3DIcon className="w-6"/> Sisa Stok
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-3">
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Kategori</label>
                            <SelectSearch placeholder={'- Pilih Kategori -'}
                                options={categoryOptions}
                                isMulti
                                onChange={(selected) => setCategory(selected.map(selected => selected.value))}
                                />
                        </div>
                        <div className="py-3 px-4 flex flex-col gap-2">
                            <label className="text-sm">Stok per tanggal :</label>
                            <Datepicker placeholder={"Tanggal"} 
                                asSingle={true} 
                                useRange={false} 
                                showShortcuts={true} 
                                configs={{
                                    shortcuts: {
                                    today: "Hari ini", 
                                    yesterday: "Kemarin",
                                }}}
                                value={dateValue}
                                onChange={(value) => setDateValue(value)}
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
                            <span className="text-md md:text-2xl text-gray-500 tracking-wider">Silahkan Pilih Tanggal Stok dan Kategori (Opsional)</span>
                        </div>
                    }
                    {data && (
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>No.</Table.Th>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th>Kategori</Table.Th>
                                    <Table.Th>Satuan</Table.Th>
                                    <Table.Th>Sisa Stok</Table.Th>
                                    <Table.Th>Sisa Stok (Kg)</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.length > 0 ? (
                                    data.map((stock, index) => (
                                        <tr key={index}>
                                            <Table.Td>{ index + 1 }</Table.Td>
                                            <Table.Td>{ stock.product_name }</Table.Td>
                                            <Table.Td>{ stock.category_name }</Table.Td>
                                            <Table.Td>{ stock.unit }</Table.Td>
                                            <Table.Td className="text-right">
                                                <NumericFormat value={ stock.remaining_stock} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                            </Table.Td>
                                            <Table.Td className="text-right">
                                                <NumericFormat value={ stock.remaining_stock_weight} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={6} message={'Data tidak ditemukan'} className="text-gray-500 text-lg">
                                        <FaceFrownIcon className="w-auto text-gray-500"></FaceFrownIcon>
                                    </Table.Empty>
                                )}
                                {data.length > 0 && (
                                    <tr>
                                        <Table.Td colSpan='4'>Total {data.length} Data</Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={ getTotal(data, 'remaining_stock')} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={0}
                                                    fixedDecimalScale={true}/>
                                        </Table.Td>
                                        <Table.Td className="text-right">
                                            <NumericFormat value={ getTotal(data, 'remaining_stock_weight')} displayType={'text'} thousandSeparator={true}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}/>
                                        </Table.Td>
                                    </tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </AppLayout>
    );
}