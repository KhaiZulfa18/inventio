import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import TableHead from "@/Components/TableHead";

export default function Index({auth, products, queryParams = null}) {

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
        >

        <Head title="Product"></Head>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-6 sm:p-8 bg-white shadow sm:rounded-lg overflow-auto">
                    <div className="py-2 w-1/3">
                        <TextInput className="w-full" placeholder="Cari..."
                        defaultValue={queryParams.name}
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                        />
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
                                    Kategori
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