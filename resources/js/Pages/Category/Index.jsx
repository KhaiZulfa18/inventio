import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({auth, categories}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category</h2>}
        >

        <Head title="Category"></Head>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-6 sm:p-8 bg-white shadow sm:rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray">
                            <tr className="bg-gray-200">
                                <th className="w-1/8 py-3 px-3 uppercase text-sm text-gray-600 border-b">No.</th>
                                <th className="w-1/3 py-3 px-3 uppercase text-sm text-gray-600 border-b">Kategori</th>
                                <th className="w-1/3 py-3 px-3 uppercase text-sm text-gray-600 border-b">Deskripsi</th>
                                <th className="w-1/3 py-3 px-3 uppercase text-sm text-gray-600 border-b">#</th>
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