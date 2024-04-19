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

export default function Index({ auth, tags }) {
  const [deleteData, setDeleteData] = useState({});

  const handleDelete = (data) => {
    setDeleteData({
      name: data.name,
      link: route('tags.destroy', data.id),
    });
    handleClickModal('modal_delete');
  }
  return (
    <Authenticated header={'Tag Postingan'} user={auth.user}>
      <Head title="Tags" />

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
          <Table.Body>
            {
              tags.data.map((tag, index) => (
                <tr key={index}>
                  <td className="px-3">{tag.name}</td>
                  <td>{localeDate(tag.created_at)}</td>
                  <td>
                    <Actions>
                      <Actions.Edit link={route('tags.edit', tag.id)} />
                      <Actions.Delete onClick={() => handleDelete(tag)} />
                    </Actions>
                  </td>
                </tr>
              ))
            }
          </Table.Body>
        </Table>
      </section>

      <section className="w-full flex justify-end items-center">
        <div className="join shadow bg-neutral">
          {
            tags.links && tags.links.map((link, _) => (
              <Link
                key={_}
                as='Button'
                href={link.url}
                className="join-item btn btn-neutral"
                disabled={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }} />
            ))
          }
        </div>
      </section>

      <ModalDelete data={deleteData.name} link={deleteData.link} />
    </Authenticated>
  )
}
