import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AppLayout from "@/Layouts/AppLayout";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({auth, users}) {

    console.log(users);
    return (
        <AppLayout>
            <Head title="Pengguna"></Head>

            <Card>
                <Card.Header title="Pengguna">
                    <UserGroupIcon className="w-6"/>
                </Card.Header>
                <Card.Body>

                    <Table className="bg-dark">
                        <Table.Thead>
                            <tr>
                                <Table.Th className={'w-10'}>No</Table.Th>
                                <Table.Th>Nama Pengguna</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Group Akses</Table.Th>
                                <Table.Th></Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {users.data.map((user, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900" key={i}>
                                    <Table.Td>{++i + (users.meta.current_page-1) * users.meta.per_page}</Table.Td>
                                    <Table.Td>{user.name}</Table.Td>
                                    <Table.Td>{user.email}</Table.Td>
                                    <Table.Td>{user.email}</Table.Td>
                                    <Table.Td><PrimaryButton>Hapus</PrimaryButton></Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Pagination links={users.meta.links}  align="c"/>
                </Card.Body>
            </Card>
        </AppLayout>
    );
}