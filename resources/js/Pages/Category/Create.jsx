import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from '@inertiajs/react'

export default function Create({auth, success}) {

    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route('category.store'));
    }

    return (
        <AppLayout>
            <Head title="Tambah Kategori"></Head>

            <Card className={"w-full"}>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        Tambah Kategori
                    </div>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Nama Kategori</label>
                                <TextInput className="w-full" placeholder={"Nama Kategori"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
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
                            <Button type={'link'} href={route('category.index')} style={'danger'}>Kembali</Button>
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