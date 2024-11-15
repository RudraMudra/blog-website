import { db } from "@/lib/firebase"
import { collection, doc, Firestore, getDoc, getDocs, query, where } from "firebase/firestore"
import { NextResponse } from "next/server"

export const getAllPosts = async () => {
    return await getDocs(collection(db, 'posts')).then((snaps) => snaps.docs.map((d) => d.data()))
}

export const getAllPostsWithCategory = async (categoryId) => {
    const q = query(collection(db, 'posts'), where('categoryId', '==', categoryId))
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}


export const getPost = async (id) => {
    const postsCol = collection(db,'posts');
    const postSnapshot = await getDocs(postsCol);
    return postSnapshot;

}

// export const getPost = async (id) => {
//     return await getDoc(doc(db, `posts/${id}`)).then((snap) => snap.data());
// }