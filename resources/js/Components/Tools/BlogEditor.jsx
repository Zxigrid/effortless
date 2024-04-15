import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
const editorKey = import.meta.env.VITE_TINYMCE_API_KEY;

const BlogEditor = ({label="Label", name, value, onChange, error, initialEditorValue}) => {
  return (
    <label className="form-control w-full">
      <div className="label mb-1">
        <span className="label-text text-graphite">{label}</span>
      </div>
      <Editor
        apiKey={editorKey}
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        name={name}
        onEditorChange={onChange}
        value={value}
        initialValue={initialEditorValue}
      />
      {
        error && (
          <div className="label">
            <span className="label-text-alt -mt-1 text-error">{error}</span>
          </div>
        )
      }
    </label>
  )
}

export default BlogEditor
