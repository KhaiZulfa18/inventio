import { Link } from '@inertiajs/react'
import React from 'react'
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2'

export default function Button({className, style, icon, label, type, href, added, url, id, children, ...props}) {

    const { delete: destroy } = useForm();

    const typeStyles = {
        primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
        info: 'bg-lime-600 hover:bg-lime-500 text-white',
        success: 'bg-teal-600 hover:bg-teal-500 text-white',
        warning: 'bg-orange-600 hover:bg-orange-500 text-white',
        danger: 'bg-rose-600 hover:bg-rose-500 text-white',
        secondary: 'bg-gray-800 hover:bg-gray-700 text-white',
      };
    
    const buttonStyle = typeStyles[style] || '';

    const customClass = {
        popup: 'bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg',
        title: 'tracking-tight text-slate-800 dark:text-white text-xl font-bold mb-2',
        htmlContainer: 'tracking-tight text-gray-600 dark:text-gray-200 mb-4',
        actions: 'space-x-2',
        confirmButton: 'rounded-lg px-3 py-2 tracking-tight font-medium transition-colors focus:outline-none flex items-center justify-center gap-1 capitalize border-2 border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20',
        cancelButton: 'rounded-lg px-3 py-2 tracking-tight font-medium transition-colors focus:outline-none flex items-center justify-center gap-1 capitalize border-2 border-red-400 bg-red-400/10 text-red-400 hover:bg-red-400/20',
    };

    const deleteData = async (url) => {
        Swal.fire({
            title: 'Apakah kamu yakin ingin menghapus data ini ?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            customClass: customClass,
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: 'Ya, saya yakin!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil dihapus!',
                    icon: 'success',
                    customClass: customClass,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            {type === 'link' &&
                <Link href={href} className={`${buttonStyle} px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-200 ${className} `}>
                    {children}
                </Link>
            }
            {type === 'button' &&
                <button type='button' className={`${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold text-gray-200 ${className} `} {...props}>
                    {children}
                </button>
            }
            {type === 'submit' &&
                <button type='submit' className={`${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold ${className} `} {...props}>
                    {children}
                </button>
            }
            {type === 'delete' &&
                <button onClick={() => deleteData(url)} className={`${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold ${className} `} {...props}>
                    {children}
                </button>
            }
            {type === 'modal' &&
                <button className={`${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold ${className} `} {...props}>
                    {children}
                </button>
            }
            {type === 'edit' &&
                <Link href={href} className={`${buttonStyle} px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold ${className} `} {...props}>
                    {children}
                </Link>
            }
            {type === 'bulk' &&
                <button {...props} className={`${buttonStyle} px-3 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-200 ${className} `}>
                    {children}
                </button>
            }
        </>
    )
}
