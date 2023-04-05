import React from "react";
import Link from "next/link";
import Image from "next/image";
import ZineLogo from "../../images/admin/logo.png"
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";

const SideNav = () => {
    const { authUser, logOut } = useAuth()
    const router = useRouter()

    const onLogout = async () => {
        await logOut()
        await router.push('/admin/login')
    }

    const page = router.pathname.split('/').pop()
    return (
        <div className="col-span-3 pt-8 px-12 text-white h-full " style={{background: "linear-gradient(to right, #003D63, #0C72B0)"}}>
            <div className="flex items-center">
                <h3 className="text-3xl font-bold">{authUser?.name}</h3>
                <Image src={ZineLogo} width={80} height={80} />
            </div>

            <Link href="/admin/dashboard">
                <p className={`text-xl mt-24 hover:text-gray-300 cursor-pointer ${page === "dashboard" ? "font-bold" : ""}`}>Dashboard</p>
            </Link>
            <Link href="/admin/registrations">
                <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "registrations" ? "font-bold" : ""}`}>Registered</p>
            </Link>
            <Link href="/admin/users">
                <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "users" ? "font-bold" : ""}`}>Users And Channels</p>
            </Link>
            <Link href="/admin/events">
                <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "events" ? "font-bold" : ""}`}>Events</p>
            </Link>
            <Link href="/admin/tasks">
                <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "tasks" ? "font-bold" : ""}`}>Tasks</p>
            </Link>
            <br />
            <Link href="/admin/announcements">
                <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "announcements" ? "font-bold" : ""}`}>Announcements</p>
            </Link>
            <p className="text-xl">Channels</p>

            <div className="bg-white rounded-3xl text-center cursor-pointer">
                <p className="text-xl mt-8 text-red-500 p-2" onClick={onLogout}>Logout</p>
            </div>
        </div>
      )
}

export default SideNav;