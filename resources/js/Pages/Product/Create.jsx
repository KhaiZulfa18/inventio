import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Head, useForm } from "@inertiajs/react";

export default function Create({auth, categories, success}) {

    const {data, setData, post, errors} = useForm({
        'name': '',
        'description': '',
        'category': '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('product.store'));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">New Product</h2>
            </div>
        }>

        <Head title="New Product"></Head>

        <div className="py-3">
            <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-6 sm:p-8 bg-white shadow sm:rounded-lg overflow-auto">
                    <form onSubmit={onSubmit} className="p-4 rounded-sm">
                        <div className="m-2">
                            <InputLabel htmlFor="name" value="Nama Produk"></InputLabel>
                            <TextInput className="w-full" id="name" name="name" placeholder="Nama Produk" autoComplete="off" onChange={(e) => setData('name', e.target.value)}/>
                            <InputError message={errors.name} className="mt-2"></InputError>
                        </div>
                        <div className="m-2">
                            <InputLabel value="Deskripisi"></InputLabel>
                            <TextArea className="w-full" id="description" name="description" onChange={(e) => setData('description', e.target.value)}></TextArea>
                            <InputError message={errors.description} className="mt-2"></InputError>
                        </div>
                        <div className="m-2">
                            <InputLabel value="Kategori"></InputLabel>
                            <SelectInput className="w-full" name="category" id="category" onChange={(e) => setData('category', e.target.value)}>
                                <option value="">- Pilih Kategori -</option>
                                {categories.data.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </SelectInput>
                            <InputError message={errors.category} className="mt-2"></InputError>
                        </div>
                        <div className="mt-4 text-right">
                            <PrimaryButton type="submit" >
                                Simpan
                            </PrimaryButton>
                        </div>
                        
                        {success && (
                            <div className="mt-4 bg-emerald-400 py-2 px-4 text-white rounded flex items-center gap-2">
                                <CheckCircleIcon className="w-5"></CheckCircleIcon> {success}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    );
}