import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
// PopUp
import PopUp from "../components/PopUp"


export default function DefaultLayout() {
    return (
        <>
            <Header />
            <PopUp />
            <main className="container-layout">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
