import { Link } from '@inertiajs/react'
import React from 'react'
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2'

export default function Button({className, style, icon, label, type, href, added, url, id, children, ...props}) {

    const { delete: destroy } = useForm();

    const typeStyles = {
        primary: 'bg-gray-800 hover:bg-gray-700 text-white',
        info: 'bg-blue-800 hover:bg-blue-700 text-white',
        success: 'bg-teal-800 hover:bg-teal-700 text-white',
        warning: 'bg-yellow-600 hover:bg-yellow-500 text-white',
        danger: 'bg-rose-800 hover:bg-rose-700 text-white',
        secondary: 'bg-indigo-800 hover:bg-indigo-700 text-white',
      };
    
    const buttonStyle = typeStyles[style] || '';

    const deleteData = async (url) => {
        Swal.fire({
            title: 'Apakah kamu yakin ingin menghapus data ini ?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, saya yakin!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil dihapus!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            {type === 'link' &&
                <Link href={href} className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-200`}>
                    {children}
                </Link>
            }
            {type === 'button' &&
                <button className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold text-gray-200`} {...props}>
                    {children}
                </button>
            }
            {type === 'submit' &&
                <button type='submit' className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold`} {...props}>
                    {children}
                </button>
            }
            {type === 'delete' &&
                <button onClick={() => deleteData(url)} className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold`} {...props}>
                    {children}
                </button>
            }
            {type === 'modal' &&
                <button className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold`} {...props}>
                    {children}
                </button>
            }
            {type === 'edit' &&
                <Link href={href} className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold`} {...props}>
                    {children}
                </Link>
            }
            {type === 'bulk' &&
                <button {...props} className={`${className} ${buttonStyle} px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-200`}>
                    {children}
                </button>
            }
        </>
    )
}
