import React, { useState } from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Plus } from 'react-feather'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import SearchBar from '@/Components/Ui/SearchBar'
import Table from '@/Components/Ui/Table'
import localeDate from '@/Lib/LocaleDate'
import Actions from '@/Components/Tools/Actions'
import ModalDelete from '@/Components/Tools/ModalDelete'
import handleClickModal from '@/Lib/HandleClickModal'

export default function Index({ auth }) {
  return (
    <Authenticated header={'Tag Postingan'} user={auth.user}>
      <Head title="Tags"/>

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Disable value={"Tags"} />
      </BreadCrumbs>

      <section className="tool-section">
        <SearchBar link={route('tags.index')} />

        <Link as="Button" href={route('tags.create')} className="btn btn-primary text-sm gap-1">
          <Plus />
          <span>Tambah Tag</span>
        </Link>
      </section>

      <section className="data-section">
        <Table>
          <Table.Head>
            <th className="px-3">Nama</th>
            <th>Tanggal dibuat</th>
            <th></th>
          </Table.Head>
        </Table>
      </section>

    </Authenticated>
  )
}