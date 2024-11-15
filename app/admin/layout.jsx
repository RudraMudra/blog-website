import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
  return (
    <section className="flex">
      <Sidebar />
      {children}
    </section>
  );
}
