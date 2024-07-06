import React from 'react'
import { Listbox } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
export default function ListBox({selected, data, setSelected, label, previewText = 'dipilih', errors}) {

    console.log(data);
    const preview = selected.length ?
        selected.length >= 4 ? `${selected.length} ${previewText}` :
        selected.map((item) => item.name).join(', ')
        :
        'Pilh Hak Akses'

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-600 text-sm'>{label}</label>
            <Listbox value={selected} onChange={setSelected} multiple by="id">
                <Listbox.Button className={'w-full px-3 py-1.5 border text-sm rounded-md focus:outline-none focus:ring-0 flex justify-between items-center gap-8 bg-white text-gray-700 focus:border-gray-200 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-gray-700 dark:border-gray-800'}>
                    {preview}
                    <ChevronDownIcon className='w-4'/>
                </Listbox.Button>
                <Listbox.Options className={' p-4 border rounded-lg flex flex-wrap gap-2 bg-gray-100 dark:border-gray-900 dark:bg-gray-950'}>
                    {data.map((item) => (
                        <Listbox.Option key={item.id} value={item}>
                            {({ selected }) => (
                                <div
                                    className='text-md cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-200 border dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 '>
                                    {selected ? <CheckCircleIcon className='w-4 text-teal-500' /> : <PlusCircleIcon className='w-4'/>}
                                    {item.name}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
