"use client"

import { getPosts } from "@/lib/firebase/post/read";
import { createNewPost, DeletePost, updatePost } from "@/lib/firebase/post/write";
import { useRouter} from "next/navigation";
import { createContext, useContext, useState } from "react";

const PostFormContext = createContext();

export default function PostFormContextProvider({ children }) {

    const router = useRouter();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setIsDone(false)
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleCreate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await createNewPost({ data: data, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleUpdate = async () => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await updatePost({ data: data, image: image });
            setIsDone(true)
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try {
            await DeletePost(id);
            setIsDone(true);
            router.push('/admin/posts');
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    const fetchData = async (id) => {
        setError(null)
        setIsLoading(true)
        setIsDone(false)
        try{
            const res = await getPosts(id);
            if (res.exists()) {
                setData(res.data())
            } else {
                setError(`Data not found within this id ${id}`)
            } 
        } catch (error) {
            setError(error?.message)
        }
        setIsLoading(false)
    }

    return (
        <PostFormContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                image,
                setImage,
                handleData,
                handleCreate,
                fetchData,
                handleUpdate,
                handleDelete,
            }}
        >
            {children}
        </PostFormContext.Provider>
    )
}

export const usePostForm = () => useContext(PostFormContext);