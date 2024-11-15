import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const getAuthor = async (id) => {
    return await getDoc(doc(db, `authors/${id}`)).then((snap) => snap.data());
}

// export const get_Author = async (id) => {
//     const postsCol = collection(db,'authors');
//     const postSnapshot = await getDocs(postsCol);
//     return postSnapshot;

// }