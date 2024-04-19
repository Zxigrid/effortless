import React, { useState } from 'react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import SearchBar from '@/Components/Ui/SearchBar'
import Table from '@/Components/Ui/Table'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Info, Plus } from 'react-feather'
import Modal from '@/Components/Ui/Modal'
import handleClickModal from '@/Lib/HandleClickModal'
import ModalDelete from '@/Components/Tools/ModalDelete'
import Actions from '@/Components/Tools/Actions'
import localeDate from '@/Lib/LocaleDate'

export default function Index({ auth, posts }) {
  const [statusData, setStatusData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const handleDelete = (data) => {
    setDeleteData({
      title: data.title,
      link: route('posts.destroy', data.id),
    });
    handleClickModal('modal_delete');
  }

  const handleSetStatus = (data) => {
    setStatusData({
      id: data.id,
      title: data.title,
      status: data.status,
    })
    handleClickModal('modal_status');
  }

  const handleUpdateStatus = () => {
    router.post(route('posts.update-status', statusData.id), {
      _method: 'put',
      status: statusData.status === 'published' ? 'draft' : 'published'
    })
  }

  return (
    <Authenticated user={auth.user} header="Postingan Blog">
      <Head title="Posts" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Disable value={"Posts"} />
      </BreadCrumbs>

      <section className="tool-section">
        <SearchBar link={route('posts.index')} />

        <Link as="Button" href={route('posts.create')} className="btn btn-primary text-sm gap-1">
          <Plus />
          <span>Tambah Blog</span>
        </Link>
      </section>

      <section className="data-section">
        <Table>
          <Table.Head>
            <th className="px-3">Thumbnail</th>
            <th>Judul</th>
            <th>Status</th>
            <th>Tanggal dibuat</th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {posts.data.map((post, index) => (
              <tr key={index} className='border-b border-base-100'>
                <td>
                  <img src={"storage/" + post.thumbnail} alt={post.title} className="w-10 h-10 rounded-full object-cover border" />
                </td>
                <td>{post.title}</td>
                <td>
                  <span className={`dash-badge ${post.status == 'published' ? ' bg-success/20 text-success' : ' bg-error/20 text-error'}`}>
                    {post.status}
                  </span>
                </td>
                <td>
                  {localeDate(post.created_at)}
                </td>
                <td>
                  <Actions>
                    <Actions.Edit link={route('posts.edit', post.id)}/>
                    <Actions.Delete onClick={() => handleDelete(post)}/>
                    <Actions.Status data={post} onClick={() => handleSetStatus(post)} />
                  </Actions>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </section>

      <section className="w-full flex justify-end items-center">
        <div className="join shadow bg-neutral">
          {
            posts.links && posts.links.map((link, _) => (
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

      <ModalDelete data={deleteData.title} link={deleteData.link} />

      <Modal
        Icon={Info}
        classNameIcon={'modal-icon info'}
        id='modal_status'
        title={'Ganti Status'}
        description={`Yakin ingin mengganti status ${statusData.title} jadi "${statusData.status === 'published' ? 'draft' : 'published'}?"`}
        cancel={
          <button className='btn-action-sm default'>
            Batal
          </button>
        }

        approve={
          <button onClick={() => handleUpdateStatus()} className='btn-action-sm info'>
            Ganti
          </button>
        }
      />
    </Authenticated>
  )
}
