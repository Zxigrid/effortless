import React from 'react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import SearchBar from '@/Components/Ui/SearchBar'
import Table from '@/Components/Ui/Table'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Plus } from 'react-feather'

export default function Index({auth, posts}) {
  console.log(posts)
  return (
    <Authenticated user={auth.user} header="Postingan Blog">
      <Head title="Posts" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Disable value={"Posts"} />
      </BreadCrumbs>

      <section className="tool-section">
        <SearchBar/>

        <Link as="Button" href={route('posts.create')} className="btn btn-primary text-sm gap-1">
          <Plus />
          <span>Tambah Blog</span>
        </Link>
      </section>

      <section className="data-section">
        <Table>
          <Table.Head>
            <th className="px-3">Thumbnail</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {posts.data.map((post, index) => (
              <tr key={index}>
                <td>
                  <img src={"storage/"+post.thumbnail} alt={post.title} className="w-10 h-10 rounded-full object-cover"/>
                </td>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{post.status}</td>
                <td>

                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </section>
    </Authenticated>
  )
}
