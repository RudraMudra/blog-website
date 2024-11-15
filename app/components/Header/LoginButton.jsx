"use client";
import { useAuth } from "@/lib/contexts/authContext";
import { Button } from "antd";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginButton() {
  const notify = () => toast("Signing in...");
  const out = () => toast("Signing out...");

  const { 
    user,
    isLoading,
    // error,
    handleSignInWithGoogle,
    handlelogout,
  } = useAuth();

  if(isLoading){
    return <p>Loading...</p>
  }

  if(user){
    return (
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => {
            out();
            handlelogout();
          }}
          type="dashed"
          className="flex 
            items-center 
            gap-3
            bg-black
            text-white
            px-4
            py-2"
          >
          {/* <FcGoogle /> */}
          Sign out
          <ToastContainer />
        </Button>
        <Link href="/admin">
          <div className="flex gap-2 rounded-xl bg-blue-100 px-3 py-2">
            {/* <img className="object-cover h-12 w-12 rounded-full" src={user?.photoURL} alt="" /> */}
            <div>
              <h1 className="font-bold">{user?.displayName}</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  
  return (
    <section>
      <Button
        onClick={() => {
          handleSignInWithGoogle();
          notify();
        }}
        type="dashed"
        className="flex 
          items-center 
          gap-3
          bg-black
          text-white
          px-4
          py-2"
        >
        <FcGoogle />
        Sign in with Google
        <ToastContainer />
      </Button>
    </section>
  );
}
