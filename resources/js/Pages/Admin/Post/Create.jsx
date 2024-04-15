import React, { useState, useRef } from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import TextInput from '@/Components/Ui/Form/TextInput'
import FileInput from '@/Components/Ui/Form/FileInput'
import PrimaryButton from '@/Components/Ui/PrimaryButton'
import { Trash2, Edit, AlertTriangle } from 'react-feather'
import Modal from '@/Components/Ui/Modal'
import BlogEditor from '@/Components/Tools/BlogEditor'

export default function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    slug: '',
    thumbnail: '',
    body: ''
  })
  const [imagePreview, setImagePreview] = useState(null);
  const inputFileRef = useRef(null);

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

  const file = data.thumbnail;
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const handleRemoveImage = () => {
    setData('thumbnail', '');
    setImagePreview(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  }
  return (
    <Authenticated user={auth.user} header="Tambah Postingan">
      <Head title="Tambah Postingan" />

      <BreadCrumbs>
        <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
        <BreadCrumbs.Link href={route('posts.index')} value={"Posts"} />
        <BreadCrumbs.Disable value={"Create"} />
      </BreadCrumbs>

      <section className="form-section flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row">
        <form onSubmit={submit} encType='multipart/form-data' className="form-layout md:w-7/12 md:flex-none lg:w-full lg:flex-1 xl:w-7/12 xl:flex-none">
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
            inputRef={inputFileRef}
            id={'thumbnail'}
          />
          <BlogEditor
            label='Body'
            name={'body'}
            value={data.body}
            error={errors.body}
            className='w-full'
            initialEditorValue="Create Content Here!"
            onChange={value => setData('body', value)}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('modal_cancel').showModal()}
              className="btn btn-outline btn-error"
              disabled={processing}
            >
              Batalkan
            </button>
            <PrimaryButton type="submit" disabled={processing}>
              Simpan
            </PrimaryButton>
          </div>
        </form>

        <div className="thumbnail-prev-layout">
          <div className="w-full">
            <div className="label flex justify-between items-end mb-2 pt-0">
              <span className="label-text text-graphite">Thumbnail Preview</span>
              <div className="flex gap-2">
                <label
                  htmlFor="thumbnail"
                  className="btn-action-sm warning"
                >
                  <Edit className="w-4 h-4" />
                </label>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="btn-action-sm error"
                  disabled={!data.thumbnail ? true : false}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <img src={imagePreview ?? `/static/images/no-preview-img.jpg`} alt="No preview" className="w-full h-64 object-cover rounded-md" />
          </div>
        </div>
      </section>

      <Modal
        id={"modal_cancel"}
        title={"Batalkan Postingan"}
        description={"Yakin ingin membatalkan postingan? semua inputan kamu tidak akan tersimpan"}
        Icon={AlertTriangle}
        classNameIcon={'modal-icon error'}
        approve={
          <Link
            as='Button'
            type='button'
            href={route('posts.index')}
            className="btn-action-sm error">
            Yakin
          </Link>
        }
        cancel={
          <button className="btn-action-sm default">
            Batal
          </button>
        }
      />
    </Authenticated>
  )
}
