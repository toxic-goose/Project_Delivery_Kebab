import { Outlet } from "react-router";
import Header from "../widgets/Header/Header";
import Footer from "../widgets/Footer/Footer";
import './Root.css'

export default function Root({ user, setUser }) {
  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
