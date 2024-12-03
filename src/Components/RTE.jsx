import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
export default function RTE({name,
              Control,
              label,
              defaultValue="",
}) {

    return (
        <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller 
        name={name}
        control={Control}
        render={({field:{onChange}})=>(
            <Editor//editor (tinymce) does not have onChange so we have to use controller now controller has onChange in field object here the editor's event handler is now set to onChange and it will be called whenever the editor's content changes and react hook form changes the state of the form(simply onEditorchange renders the editor and as its control is passed to another component(any component using it), content will be rendered there) 
            apiKey='j8950u4ltrjsw7z9bgklvg3gksdivz62xu5xwew5s0bena93'
            initialValue={defaultValue}
            init={{
                selector: '#editor',
                
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
    
            onEditorChange={onChange}
             />
        )}
        />
        </div>
    )
}


