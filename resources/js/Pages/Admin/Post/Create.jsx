import React from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import TextInput from '@/Components/Ui/Form/TextInput'
import FileInput from '@/Components/Ui/Form/FileInput'
import PrimaryButton from '@/Components/Ui/PrimaryButton'

export default function Create({ auth }) {
  const { data, setData, post, processing, progress, errors } = useForm({
    title: '',
    slug: '',
    thumbnail: '',
    body: ''
  })

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  const onHandleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    if (name === 'title') {
      const slugValue = generateSlug(value);
      setData({ ...data, [name]: value, slug: slugValue });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('posts.store'));
  }
  return (
    <Authenticated user={auth.user} header="Tambah Postingan">
      <Head title="Tambah Postingan" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Link href={route('posts.index')} value={"Posts"} />
        <BreadCrumbs.Disable value={"Create"} />
      </BreadCrumbs>

      <section className="form-section">
        <form onSubmit={submit} className="form-layout">
          <TextInput
            label="Title"
            name={'title'}
            onChange={onHandleChange}
            value={data.title}
            error={errors.title}
          />
          <TextInput
            label="Slug"
            name={'slug'}
            value={data.slug}
            disabled={true}
            error={errors.slug}
          />
          <FileInput
            label="Thumbnail"
            name={'thumbnail'}
            accept="image/*"
            onChange={e => setData('thumbnail', e.target.files[0])}
            error={errors.thumbnail}
          />
          <TextInput
            label="Body"
            name={'body'}
            onChange={onHandleChange}
            value={data.body}
            error={errors.body}
          />
          <div className="flex justify-end gap-3">
            <button className="btn btn-outline btn-error">
              Batalkan
            </button>
            <PrimaryButton type="submit">
              Simpan
            </PrimaryButton>
          </div>
        </form>
        <div className="thumbnail-prev-layout"></div>
      </section>
    </Authenticated>
  )
}
