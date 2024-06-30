import Card from "@/Components/Card";
import AppLayout from "@/Layouts/AppLayout";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth}) {
    return (
        <AppLayout>
            <Head title="Pengguna"></Head>

            <Card>
                <Card.Header title="Pengguna">
                    <UserGroupIcon className="w-5"/>
                </Card.Header>
                <Card.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo at labore mollitia laboriosam accusamus sint, debitis expedita accusantium, distinctio quod deserunt quam iusto eligendi quisquam, ipsam earum culpa doloribus error.
                </Card.Body>
            </Card>
        </AppLayout>
    );
}