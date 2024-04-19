import React, {useState} from 'react'
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

export default function Index({ auth, categories }) {
  const [deleteData, setDeleteData] = useState({});

  const handleDelete = (data) => {
    setDeleteData({
      name: data.name,
      link: route('categories.destroy', data.id),
    });
    handleClickModal('modal_delete');
  }
  return (
    <Authenticated header={'Kategori Postingan'} user={auth.user}>
      <Head title="Categories" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Disable value={"Categories"} />
      </BreadCrumbs>

      <section className="tool-section">
        <SearchBar link={route('categories.index')} />

        <Link as="Button" href={route('categories.create')} className="btn btn-primary text-sm gap-1">
          <Plus />
          <span>Tambah Kategori</span>
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
              categories.data.map((category, index) => (
                <tr key={index}>
                  <td className="px-3">{category.name}</td>
                  <td>{localeDate(category.created_at)}</td>
                  <td>
                    <Actions>
                      <Actions.Edit link={route('categories.edit', category.id)} />
                      <Actions.Delete onClick={() => handleDelete(category)}/>
                    </Actions>
                  </td>
                </tr>
              ))
            }
          </Table.Body>
        </Table>
      </section>
      <ModalDelete data={deleteData.name} link={deleteData.link} />
    </Authenticated>
  )
}
