import Button from "@/Components/Button";
import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from '@inertiajs/react'
import toast from 'react-hot-toast'

export default function Edit({auth, category, success}) {

    const {data, setData, post, errors} = useForm({
        name: category.data.name,
        description: category.data.description,
        _method: 'PUT',
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        post(route('category.update', category.data.id), {
            onSuccess: () => {
                toast('Data berhasil diubah', {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#1C1F29',
                        color: '#fff',
                    },
                })
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Ubah Kategori"></Head>

            <Card className={"w-full"}>
                <Card.Header className="flex items-center justify-between gap-1">
                    <div className="flex justify-normal gap-2">
                        Ubah Kategori
                    </div>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit} >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Nama Kategori</label>
                                <TextInput className="w-full" placeholder={"Nama Kategori"} autoComplete="off" 
                                    onChange={e => setData('name', e.target.value)}
                                    value={data.name}
                                    />
                                <InputError message={errors.name} className="mt-2"></InputError>
                            </div>
                            <div className="py-3 px-4 flex flex-col gap-2">
                                <label>Deskripsi</label>
                                <TextArea className="w-full" id="description" name="description" 
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                    >
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