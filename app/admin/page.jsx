// import Layout from "./layout";

import { StickyNote, PersonStanding, NotebookTabs } from "lucide-react";
import CountCard from "./components/CountCard";

export default function Page() {
  return (
    <main className=" flex flex-grid gap-10 p-10">
      <CountCard name={"Posts"} path={"posts"} icon={<StickyNote />} />
      <CountCard name={"Authors"} path={"authors"} icon={<PersonStanding />} />
      <CountCard name={"Categories"} path={"categories"} icon={<NotebookTabs />} />
    </main>
  );
}
