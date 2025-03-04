import Header from "./Header"
import { Outlet } from "react-router-dom"
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">DT210G &copy;2025 Annelie Svensson</footer>
    </div>
    )
}

export default Layout