import React, { useState, useRef } from 'react'
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import BreadCrumbs from '@/Components/Ui/BreadCrumbs'
import TextInput from '@/Components/Ui/Form/TextInput'
import FileInput from '@/Components/Ui/Form/FileInput'
import PrimaryButton from '@/Components/Ui/PrimaryButton'
import { Trash2, Edit, AlertTriangle, Info, Lock, Unlock } from 'react-feather'
import Modal from '@/Components/Ui/Modal'
import BlogEditor from '@/Components/Tools/BlogEditor'
import { router, usePage } from '@inertiajs/react'

export default function EditPage({ auth, postData }) {
  const { errors } = usePage().props;
  const [processing, setProcessing] = useState(false);
  const { data, setData } = useForm({
    title: postData.title,
    slug: postData.slug,
    thumbnail: '',
    body: postData.body,
    status: postData.status
  })
  const [imagePreview, setImagePreview] = useState(`/storage/${postData.thumbnail}`);
  const inputFileRef = useRef(null);
  console.log(data.status)

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
    router.post(route('posts.update', postData.id), {
      _method: 'put',
      ...data
    }, {
      onStart: page => setProcessing(true),
      onFinish: page => setProcessing(false),
    })
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
    setImagePreview(`/storage/${postData.thumbnail}`);
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  }
  return (
    <Authenticated user={auth.user} header="Edit Postingan">
      <Head title="Edit Postingan" />

      <section className="flex justify-between items-end">
        <BreadCrumbs>
          <BreadCrumbs.Link href={route('dashboard')} value={"Dashboard"} />
          <BreadCrumbs.Link href={route('posts.index')} value={"Posts"} />
          <BreadCrumbs.Disable value={"Edit"} />
        </BreadCrumbs>

        <button
          type="button"
          onClick={() => document.getElementById('modal_status').showModal()}
          className={`btn-action-sm capitalize ${data.status === 'draft' ? 'error' : 'success'}`}
          disabled={processing}
        >
          {data.status === 'draft' ? <Lock className='w-4 h-4'/> : <Unlock className='w-4 h-4'/>}
          {data.status}
        </button>
      </section>

      <section className="form-section">
        <form onSubmit={submit} encType="multipart/form-data" className="form-layout">
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
            error={errors.body}
            className='w-full'
            value={data.body}
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
                <label htmlFor="thumbnail" type="button" className="btn-action-sm warning" disabled={!postData.thumbnail ? true : false}>
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
        id={"modal_status"}
        title={"Ganti Status Postingan"}
        description={`Yakin ingin mengganti status postingan jadi ${data.status === 'published' ? 'draft' : 'published'} ?`}
        Icon={Info}
        classNameIcon={`modal-icon ${data.status === 'published' ? 'error' : 'success'}`}
        approve={
          <button onClick={(e)=>setData('status', data.status === 'published' ? 'draft' : 'published')} className={`btn-action-sm ${data.status === 'published' ? 'error' : 'success'}`}>
            {data.status === 'published' ? 'Draft' : 'Publish'}
          </button>
        }
        cancel={
          <button className="btn-action-sm default">
            Batal
          </button>
        }
      />

      <Modal
        id={"modal_cancel"}
        title={"Batalkan Postingan"}
        description={"Yakin ingin membatalkan postingan? inputan kamu yang sudah di edit tidak akan tersimpan"}
        Icon={AlertTriangle}
        classNameIcon={'modal-icon error'}
        approve={
          <Link as='Button' type='button' href={route('posts.index')} className="btn-action-sm error">
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
