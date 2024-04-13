import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import SearchBar from '@/Components/Ui/SearchBar'
import Table from '@/Components/Ui/Table'
import DataSection from '@/Layouts/Admin/DataSection'
import ToolSection from '@/Layouts/Admin/ToolSection'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Plus } from 'react-feather'

export default function Index({auth}) {
  return (
    <Authenticated user={auth.user}>
      <Head title="Posts" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Disable value={"Posts"} />
      </BreadCrumbs>

      <ToolSection>
        <SearchBar/>

        <Link href="#" className="btn btn-primary text-sm gap-1">
          <Plus />
          <span>Tambah Blog</span>
        </Link>
      </ToolSection>

      <DataSection>
        <Table>
          <Table.Head>
            <th className="px-3">Thumbnail</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th></th>
          </Table.Head>
        </Table>
      </DataSection>
    </Authenticated>
  )
}
