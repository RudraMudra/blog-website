import { db, storage } from "@/lib/firebase";
import { Timestamp, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    if (!image) {
        throw new Error("Image is not selected");
    }
    const imageRef = ref(storage, `categories/${data?.slug}`);
    // await uploadBytes(imageRef, image);
    // const imageURL = await getDownloadURL(imageRef);

    const firestoreRef = doc(db, `categories/${data?.slug}`)
    await setDoc(firestoreRef, {
        ...data,
        id: data?.slug,
        imageURL: `categories/${data.slug}.png`,
        // iconURL: imageURL,
        timestamp: Timestamp.now(),
    });
}

export const updateCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("Name is undefined");
    }
    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    if (image) {
        const imageRef = ref(storage, `categories/${data?.slug}`);
        // await uploadBytes(imageRef, image);
        // const imageURL = await getDownloadURL(imageRef);
    }

    const firestoreRef = doc(db, `categories/${data?.id}`)
    await updateDoc(firestoreRef, {
        ...data,
        imageURL: `categories/${data.id}.png`,
        timestamp: Timestamp.now(),
    });
}

export const DeleteCategory = async (id) => {
    if (!id) {
        throw new Error("Id is undefined");
    }

    await deleteDoc(doc(db, `categories/${id}`));
}