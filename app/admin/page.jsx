// import Layout from "./layout";
"use client";

import AuthProvider, { useAuth } from "@/lib/contexts/authContext";

import { StickyNote, PersonStanding, NotebookTabs } from "lucide-react";
import CountCard from "./components/CountCard";
import { useAdmin } from "@/lib/firebase/admins/read";

function InnerLayout() {
  const { user, isLoading: authIsLoading } = useAuth();
  const { data, error, isLoading } = useAdmin({ uid: user?.uid });
  if (authIsLoading || isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return (
      <div>
        <h1>You are not admin</h1>
      </div>
    );
  }
  return (
    <>
      <section className="flex">
        {/* <Sidebar /> */}
        <main className=" flex flex-grid gap-10 p-10">
          <CountCard name={"Posts"} path={"posts"} icon={<StickyNote />} />
          <CountCard
            name={"Authors"}
            path={"authors"}
            icon={<PersonStanding />}
          />
          <CountCard
            name={"Categories"}
            path={"categories"}
            icon={<NotebookTabs />}
          />
        </main>
      </section>
    </>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <InnerLayout />
    </AuthProvider>
  );
}
