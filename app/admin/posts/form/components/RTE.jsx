import { useState } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { usePostForm } from "../contexts/PostFormContext";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: {
        container: [
            [{ header: [1,2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['extra-small', 'small', 'medium', 'large']}],
            [{ list: 'ordered'}, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

export function RTEField(){
    const {data, handleData} = usePostForm();

    const handleChange = (value) => {
        handleData('content', value);
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={data?.content}
                onChange={handleChange}
                placeholder="Write something amazing..."
            />
        </div>
    )

}