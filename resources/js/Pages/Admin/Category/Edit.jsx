import React, { useState } from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link, useForm, router, usePage } from '@inertiajs/react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import TextInput from '@/Components/Ui/Form/TextInput'
import PrimaryButton from '@/Components/Ui/PrimaryButton'

export default function Create({ auth, category }) {
  const { errors } = usePage().props;
  const [processing, setProcessing] = useState(false);
  const { data, setData } = useForm({
    name: category.name,
    slug: category.slug
  })
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  const onHandleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    const slugValue = generateSlug(value);
    setData({ ...data, [name]: value, slug: slugValue });
  }

  const submit = (e) => {
    e.preventDefault();
    router.post(route('categories.update', category.id), {
      _method: 'put',
      ...data
    }, {
      onStart: page => setProcessing(true),
      onFinish: page => setProcessing(false),
    })
  }
  return (
    <Authenticated user={auth.user} header="Tambah Kategori">
      <Head title="Tambah Kategori" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Link href={route('categories.index')} value={"Categories"} />
        <BreadCrumbs.Disable value={"Edit"} />
      </BreadCrumbs>

      <section className="form-section justify-start">
        <form onSubmit={submit} className="form-layout md:w-6/12 md:flex-none lg:w-6/12 xl:flex-none">
          <TextInput
            label="Nama"
            name={'name'}
            onChange={onHandleChange}
            value={data.name}
            error={errors.name}
          />
          <TextInput
            label="Slug"
            name={'slug'}
            value={data.slug}
            disabled={true}
            error={errors.slug}
          />
          <div className="flex justify-end gap-3">
            <Link
              as="Button"
              className="btn btn-outline btn-error"
              disabled={processing}
              href={route('categories.index')}
            >
              Batalkan
            </Link>
            <PrimaryButton type="submit" disabled={processing}>
              Simpan
            </PrimaryButton>
          </div>
        </form>
      </section>
    </Authenticated>
  )
}
