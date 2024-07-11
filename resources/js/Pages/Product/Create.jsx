import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from '@inertiajs/react'

export default function Create({auth, categories, success}) {

    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
        category: '',
        unit: '',
        weight: '',
        code: '',
        price: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route('product.store'));
    }

    return (
        <AppLayout>
            <Head title="Tambah Produk"></Head>

            <Card className={"w-full"}>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        Tambah Produk
                    </div>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Nama Produk</label>
                                <TextInput className="w-full" placeholder={"Nama Produk"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Kategori</label>
                                <SelectInput className="w-full" name="category" id="category" onChange={(e) => setData('category', e.target.value)}>
                                    <option value="">- Pilih Kategori -</option>
                                    {categories.data.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.category} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Satuan Produk</label>
                                <SelectInput className="w-full" name="unit" id="unit" onChange={(e) => setData('unit', e.target.value)}>
                                    <option value="">- Pilih Satuan -</option>
                                    <option value="dus">Dus</option>
                                    <option value="karung">Karung</option>
                                    <option value="pcs">Pcs</option>
                                    <option value="sak">Sak</option>
                                </SelectInput>
                                <InputError message={errors.unit} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Berat Produk (Kg)</label>
                                <TextInput type={'number'} className="w-full" placeholder={"Berat Produk"} autoComplete="off" 
                                    onChange={e => setData('weight', e.target.value)} step="0.01"
                                    />
                                <InputError message={errors.weight} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Harga Produk (Rp)</label>
                                <TextInput type={'number'} className="w-full" placeholder={"Harga Produk"} autoComplete="off" 
                                    onChange={e => setData('price', e.target.value)} step="0.01"
                                    />
                                <InputError message={errors.price} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Code Produk</label>
                                <TextInput className="w-full" placeholder={"Code Produk"} autoComplete="off" 
                                    onChange={e => setData('code', e.target.value)}
                                    />
                                <span className="text-gray-500 text-sm">* Code adalah barcode pada kemasan produk</span>
                                <InputError message={errors.code} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Deskripsi</label>
                                <TextArea className="w-full" id="description" name="description" 
                                    onChange={(e) => setData('description', e.target.value)}>
                                </TextArea>
                                <InputError message={errors.description} className="mt-2"></InputError>
                            </div>
                        </div>
                        <div className="px-4 pt-5 flex gap-2 justify-end">
                            <Button type={'submit'} style={'success'}>Simpan</Button>
                            <Button type={'link'} href={route('product.index')} style={'danger'}>Kembali</Button>
                        </div>

                        {success && (
                            <div className="mt-4 bg-teal-700 py-2 px-5 text-white rounded-lg flex items-center gap-2">
                                <CheckCircleIcon className="w-5"></CheckCircleIcon> {success}
                            </div>
                        )}
                    </form>
                </Card.Body>
            </Card>
        </AppLayout>
    )
}