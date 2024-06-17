import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category</h2>}
        >

        </AuthenticatedLayout>
    );
}