"use client"

// import { getPost } from "@/lib/firebase/post/read_server";

import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getPost } from "@/lib/firebase/post/read_server";
import { useEffect, useState } from "react";

// export async function generateMetadata({params, seacrhParams}, parent){
  
// }


export default function Page({ params }) {
    const { postId } = params;
    const [post,setPost] = useState("");

    const handleGetPost = async (postId) => {
       getPost(postId)
       .then((snap) => {
              snap.docs.map((d)=>{
                if(d._document.data.value.mapValue.fields.id.stringValue === postId){
                    setPost(d._document.data.value.mapValue.fields);
                };
              });
        })
         .catch((error) => {
              console.log(error);
         });

    }
    useEffect(() => {
        handleGetPost(postId);

    }, [postId]);

    if(!post){
        return <></>
    }
    return (
        <main className="">
            <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
                {/* <p>{post.id.stringValue}</p> */}
                <h1 className="font-bold">{post?.categoryId?.stringValue}</h1>
                {/* <h1>{post?.authorId?.stringValue}</h1> */}
                <h1 className="text-3xl font-bold">{post?.title?.stringValue}</h1>
                {/* <p>{post?.content?.stringValue}</p> */}
                <img className="w-full object-cover" src={post?.imageURL?.stringValue} alt={post?.title?.stringValue} />
                <AuthorCard authorId={post?.authorId?.stringValue} />
                {/* <AuthorCard authorId={post?.authorId} /> */}
                <div dangerouslySetInnerHTML={{__html : post?.content?.stringValue}}>
                    {/* {post?.content?.stringValue} */}
                </div>
                {/* <p>{post?.timestamp}</p> */}
            </section>
        </main>
    );
}

function AuthorCard({ authorId }) {
    const author = getAuthor(authorId);
    return (
      <div className="flex gap-2 items-center">
        <img
          className="h-7 w-7 rounded-full object-cover"
          src={author?.imageURL}
          alt={author?.name}
        />
        <h1 className="text-sm text-gray-500">{author?.name}</h1>
        {/* <h5>{author?.email}</h5> */}
      </div>
    );
  }

// export default async function Page({ params }) {
//     const { postId } = params;
//     const post = await getPost(postId)
//     return <main className="flex justify-center">
//         <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
//             <CategoryCard categoryId={post?.categoryId} />
//             <h1 className="text-2xl font-bold">{post.title}</h1>
//             <img className="w-full object-cover" src={post?.imageURL} alt="" />
//             <div className="flex justify-between items-center">
//                 <AuthorCard authorId={post?.authorId} />
//                 <h5 className="text-xs text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
//             </div>
//             {/* <div dangerouslySetInnerHTML={{ __html: post?.content }}></div> */}
//         </section>
//     </main>
// }

// async function AuthorCard({ authorId }) {
//     const author = await getAuthor(authorId);
//     return <div className="flex gap-2 items-center">
//         <img className="h-6 w-6 rounded-full object-cover" src={author?.photoURL} alt="" />
//         <h4 className="text-sm text-gray-500">{author?.name}</h4>
//     </div>
// }

// async function CategoryCard({ categoryId }) {
//     const category = await getCategory(categoryId);
//     return <div className="flex">
//         <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
//             <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
//             <h4 className="text-xs text-gray-500">{category?.name}</h4>
//         </div>
//     </div>
// }