"use client"

import { getAuthor } from "@/lib/firebase/author/read";
import { createNewAuthor, DeleteAuthor, updateAuthor } from "@/lib/firebase/author/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {

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
            await createNewAuthor({ data: data, image: image });
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
            await updateAuthor({ data: data, image: image });
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
            await DeleteAuthor(id);
            setIsDone(true);
            router.push('/admin/authors');
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
            const res = await getAuthor(id);
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
        <AuthorFormContext.Provider
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
        </AuthorFormContext.Provider>
    )
}

export const useAuthorForm = () => useContext(AuthorFormContext);