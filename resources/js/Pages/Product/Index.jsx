import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline'
import TableHead from "@/Components/TableHead";
import SelectInput from "@/Components/SelectInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({auth, categories, products, queryParams = null,}) {

    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value;
        }else {
            delete queryParams[name];
        }

        router.get(route('product.index'),queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
    
        router.get(route('product.index'),queryParams);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>
                    <Link href={route('product.create')} className="inline-flex items-center gap-1 uppercase bg-gray-800 px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white hover:bg-gray-700">
                        <PlusIcon className="w-4"></PlusIcon> New
                    </Link>
                </div>
            }
        >

        <Head title="Product"></Head>

        <div className="py-3">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-6 sm:p-8 bg-white shadow sm:rounded-lg overflow-auto">
                    <div className="py-2 w-full flex items-center justify-start gap-1 ">
                        <TextInput className="w-1/2" placeholder="Cari..."
                        defaultValue={queryParams.name}
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                        />
                        <SelectInput className="w-1/2" 
                        defaultValue={queryParams.category}
                        onChange={e => searchFieldChanged('category', e.target.value)}>
                            <option value="">- Pilih Kategori -</option>
                            {categories.data.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </SelectInput>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray">
                            <tr className="bg-gray-200">
                                <TableHead name='id' sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}>
                                    ID
                                </TableHead>
                                <TableHead name='name' sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}>
                                    Produk
                                </TableHead>
                                <TableHead name='description' sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}>
                                    Deskripsi
                                </TableHead>
                                <TableHead name='categories.name' sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}>
                                    Kategori
                                </TableHead>
                                <th className="w-1/3 py-3 px-3 text-sm text-center text-gray-600 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="w-1/6 py-3 px-4 border-b text-center">{product.id}</td>
                                    <td className="w-1/4 py-3 px-4 border-b">{product.name}</td>
                                    <td className="w-1/4 py-3 px-4 border-b text-nowrap">{product.description}</td>
                                    <td className="w-1/4 py-3 px-4 border-b text-nowrap">{product.category.name}</td>
                                    <td className="w-1/4 py-3 px-4 border-b text-right">
                                        <Link href={route('product.edit', product.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1">
                                            Edit
                                        </Link> 
                                        <Link href={route('product.destroy', product.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={products.meta.links}  align="c"/>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    );
}