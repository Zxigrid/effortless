import React, { useState } from 'react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import SearchBar from '@/Components/Ui/SearchBar'
import Table from '@/Components/Ui/Table'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { DownloadCloud, Edit, Info, Plus, Trash2, UploadCloud } from 'react-feather'
import Modal from '@/Components/Ui/Modal'
import handleClickModal from '@/Lib/HandleClickModal'
import ModalDelete from '@/Components/Tools/ModalDelete'

export default function Index({ auth, posts }) {
  const [deleteLink, setDeleteLink] = useState('#');
  const [status, setStatus] = useState('');
  const [deleteTitle, setDeleteTitle] = useState('');
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const handleDeleteLink = (link, postTitle) => {
    setDeleteLink(link);
    handleClickModal('modal_delete');
    setDeleteTitle(postTitle);
  }

  const handleSetStatus = (status) => {
    setStatus(status)
    handleClickModal('modal_status');
  }

  const handleUpdateStatus = () => {
    router.post(route('posts.update-status', status.id), {
      _method: 'put',
      status: status.status === 'published' ? 'draft' : 'published'
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
        <SearchBar />

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
                  {new Date(post.created_at).toLocaleDateString('id-ID', dateOptions)}
                </td>
                <td>
                  <div className="flex items-center gap-2 px-3">
                    <Link
                      as='Button'
                      href={route('posts.edit', post.id)}
                      className="btn-action-sm warning"
                    >
                      <Edit className='w-4 h-4' />
                    </Link>
                    <button
                      onClick={() => handleDeleteLink(route('posts.destroy', post.id), post.title)}
                      type="button"
                      className='btn-action-sm error'>
                      <Trash2 className='w-4 h-4' />
                    </button>
                    <button
                      className={`btn-action-sm
                          ${post.status == 'published' ? 'warning' : 'success'}`
                      }
                      onClick={() => handleSetStatus(post)}
                    >
                      {
                        post.status == 'published' ? (
                          <DownloadCloud className='w-4 h-4' />
                        ) : (
                          <UploadCloud className='w-4 h-4' />
                        )
                      }
                    </button>
                  </div>
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

      <ModalDelete data={deleteTitle} link={deleteLink} />
      <Modal
        Icon={Info}
        classNameIcon={'modal-icon info'}
        id='modal_status'
        title={'Ganti Status'}
        description={`Apakah anda yakin ingin mengubah status postingan ini jadi ${status === 'draft' ? 'published' : 'draft'}?`}
        cancel={
          <button className='btn-action-sm default'>
            Batal
          </button>
        }

        approve={
          <button
            onClick={() => handleUpdateStatus()}
            className='btn-action-sm info'
          >
            Ganti
          </button>
        }
      />
    </Authenticated>
  )
}
