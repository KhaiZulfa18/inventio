import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import TableHead from "@/Components/TableHead";

export default function Index({auth, categories, queryParams = null}) {

    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value;
        }else {
            delete queryParams[name];
        }

        router.get(route('category.index'),queryParams);
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
    
        router.get(route('category.index'),queryParams);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category</h2>}
        >

        <Head title="Category"></Head>

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
                                <th className="w-1/3 py-3 px-3 text-sm text-center text-gray-600 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {categories.data.map((category) => (
                                <tr key={category.id}>
                                    <td className="w-1/6 py-3 px-4 border-b text-center">{category.id}</td>
                                    <td className="w-1/4 py-3 px-4 border-b">{category.name}</td>
                                    <td className="w-1/4 py-3 px-4 border-b text-nowrap">{category.description}</td>
                                    <td className="w-1/4 py-3 px-4 border-b text-right">
                                        <Link href={route('category.edit', category.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1">
                                            Edit
                                        </Link> 
                                        <Link href={route('category.destroy', category.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={categories.meta.links}  align="c"/>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    );
}