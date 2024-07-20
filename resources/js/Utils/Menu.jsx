import { usePage } from '@inertiajs/react';
import { PlusCircleIcon, TableCellsIcon, UserPlusIcon, ShieldExclamationIcon, UsersIcon, TagIcon, CubeIcon, FingerPrintIcon, UserGroupIcon, InboxArrowDownIcon, DocumentChartBarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import hasAnyPermission from './Permissions';
import React from 'react'

export default function Menu() {

    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: 'Overview',
            permissions: hasAnyPermission(['dashboard']),
            details: [
                {
                    title : 'Dashboard',
                    href : '/dashboard',
                    active: url.startsWith('/dashboard') ? true : false,
                    icon : <TableCellsIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['dashboard']),
                },
            ]
        },
        {
            title: 'User Management',
            permissions: hasAnyPermission(['permission-view']) || hasAnyPermission(['role-view']) || hasAnyPermission(['user-view']),
            details : [
                {
                    title : 'Hak Akses',
                    href : '/permission',
                    active: url.startsWith('/permission') ? true : false,
                    icon : <FingerPrintIcon className="w-5"/>,
                    permissions: hasAnyPermission(['permission-view']),
                },
                {
                    title : 'Akses Group',
                    href : '/role',
                    active: url.startsWith('/role') ? true : false,
                    icon : <UsersIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['role-view']),
                },
                {
                    title : 'Pengguna',
                    icon : <UserGroupIcon className="w-5"/>,
                    permissions: hasAnyPermission(['user-view']),
                    subdetails: [
                        {
                            title: 'Data Pengguna',
                            href: '/user',
                            icon: <TableCellsIcon className="w-5"/>,
                            active: url.startsWith('/user') ? true : false,
                            permissions: hasAnyPermission(['user-view']),
                        },
                    ]
                }
            ]
        },
        {
            title: 'Master Management',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Kategori',
                    href : '/category',
                    active: url.startsWith('/category') ? true : false,
                    icon : <TagIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
                {
                    title : 'Produk',
                    href : '/product',
                    active: url.startsWith('/product') ? true : false,
                    icon : <CubeIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
            ]
        },
        {
            title: 'Pembelian (Purchase)',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Pembelian',
                    href : '/purchase/create',
                    active: url.startsWith('/purchase/create') ? true : false,
                    icon : <InboxArrowDownIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
                {
                    title : 'Riwayat Pembelian',
                    href : '/purchase/',
                    active: url == '/purchase' || url.startsWith('/purchase/show/') ? true : false,
                    icon : <DocumentChartBarIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
            ]
        },
        {
            title: 'Penjualan (Sale)',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Penjualan',
                    href : '/sale/create',
                    active: url.startsWith('/sale/create') ? true : false,
                    icon : <ShoppingCartIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
                {
                    title : 'Riwayat Penjualan',
                    href : '/sale/',
                    active: url == '/sale' || url.startsWith('/sale/show/')  ? true : false,
                    icon : <DocumentChartBarIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
            ]
        },
        {
            title: 'Stok (Stock)',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Sisa Stok',
                    href : '/stock',
                    active: url.startsWith('/stock') ? true : false,
                    icon : <InboxArrowDownIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
                {
                    title : 'Mutasi Stok',
                    href : '/stock/mutation',
                    active: url.startsWith('/stock/mutation') ? true : false,
                    icon : <DocumentChartBarIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
                {
                    title : 'Kartu Stok',
                    href : '/stock/card',
                    active: url.startsWith('/stock/card') ? true : false,
                    icon : <DocumentChartBarIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
            ]
        },
        {
            title: 'Keuangan (Finance)',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Laporan Keuangan',
                    href : '/finance',
                    active: url.startsWith('/finance') ? true : false,
                    icon : <InboxArrowDownIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
            ]
        },
    ]

    return menuNavigation;
}
