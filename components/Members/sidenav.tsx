import React, {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import ZineLogo from "../../images/admin/logo.png";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import hamburger from "../../images/hamburger.svg";
import Modal from "./modal";
import { getAuth, deleteUser } from "firebase/auth";
import { deleteUserFromEmail } from "../../apis/users";
import { toast } from "react-toastify";
import { ITaskData, deleteTask } from "../../apis/tasks";
import tasks from "./Admin/tasks";

const SideNav = () => {
  const { authUser, logOut } = useAuth();
  const [hide, setHide] = useState(true);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth
  );
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      updateScreenWidth
    );
    return () =>
      window.removeEventListener(
        "resize",
        updateScreenWidth
      );
  }, []);

  const _deleteAccount = async (email: string|undefined) => {
      
      const auth = getAuth()
      const user = auth.currentUser

      if(user==null){
        setDeleteAccount(false)
        toast.error("Delete Account Failed!")
      }
      else{
        deleteUser(user).then(()=>{
          deleteUserFromEmail(email).then(logOut).then(()=>{
            toast.success("Account deleted Successfully")
          })
        })
      }
  }

  const router = useRouter();
  const page = router.pathname.split("/").pop();
  return (
    <>
      {(!hide || screenWidth > 768) && (
        <div
          className="fixed h-full w-full col-span-12 md:col-span-3 pt-8 px-12 text-white md:relative md:block z-50"
          style={{
            background:
              "linear-gradient(to right, #003D63, #0C72B0)",
          }}
        >
          <div className="flex flex-col items-center justify-between pt-6">
            <div className="flex px-auto">
              <Image
                src={ZineLogo}
                width={80}
                height={80}
              />
            </div>
            {/* <h3 className="text-3xl font-bold mt-4 md:mr-2">{authUser?.name}</h3> */}
          </div>

          {authUser!.type === "admin" && (
            <div className="mt-24 md:mt-20">
              <Link href="/admin/dashboard">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "dashboard"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Dashboard
                </p>
              </Link>
              <Link href="/admin/registrations">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "registrations"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Registered
                </p>
              </Link>
              <Link href="/admin/users">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "users"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Users And Channels
                </p>
              </Link>
              <Link href="/admin/userRoles">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "userRoles"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Users And Roles
                </p>
              </Link>
              <Link href="/admin/events">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "events"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Events
                </p>
              </Link>
              <Link href="/admin/tasks">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "tasks"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Tasks
                </p>
              </Link>
              <br />
              <Link href="/admin/announcements">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "announcements"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Announcements
                </p>
              </Link>
              <Link href="/admin/rooms">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "rooms"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Rooms
                </p>
              </Link>
              <Link href="/admin/roles">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "roles"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Roles
                </p>
              </Link>
              <Link href="/admin/projects">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "projects"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Projects
                </p>
              </Link>
              {/* <Link href="/admin/createblogs">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "projects"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Create Blog
                </p>
              </Link> */}
              {/* <Link href="/admin/blogsdisplay">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "projects"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Blogs View
                </p>
              </Link> */}
            </div>
          )}
          {authUser!.type === "user" && (
            <div className="mt-18 w-full">
              {/* <Link href="/users/projects">
                        <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "projects" ? "font-bold" : ""}`}>Projects</p>
                    </Link>
                    <Link href="/users/announcements">
                        <p className={`text-xl hover:text-gray-300 cursor-pointer ${page === "announcements" ? "font-bold" : ""}`}>Announcements</p>
                    </Link> */}
              {/* <div className={`bg-white md:w-full py-2 px-10 rounded-2xl ${page === "dashboard" ? "bg-opacity-20" : "bg-opacity-5"}`}>
                        <p className={`text-white text-xl cursor-pointer font-extrabold`}>Dashboard</p>
                    </div> */}
              <div
                className={`bg-white md:w-full py-2 px-10 rounded-2xl mt-2 ${
                  page === "announcements"
                    ? "bg-opacity-20"
                    : "bg-opacity-5"
                }`}
              >
                <Link href="/users/announcements">
                  <p
                    className={`text-white text-xl cursor-pointer font-extrabold opacity-100`}
                    onClick={() => {
                      setHide(true);
                    }}
                  >
                    Dashboard
                  </p>
                </Link>
              </div>
              <div
                className={`bg-white md:w-full py-2 px-10 rounded-2xl mt-2 ${
                  page === "projects"
                    ? "bg-opacity-20"
                    : "bg-opacity-5"
                }`}
              >
                <Link href="/users/projects">
                  <p
                    className={`text-white text-xl cursor-pointer font-extrabold`}
                    onClick={() => {
                      setHide(true);
                    }}
                  >
                    Tasks
                  </p>
                </Link>
              </div>
              <div
                className={`bg-white md:w-full py-2 px-10 rounded-2xl mt-2 ${
                  page === "channels"
                    ? "bg-opacity-20"
                    : "bg-opacity-5"
                }`}
              >
                <Link href="/users/channels">
                  <p
                    className={`text-white text-xl cursor-pointer font-extrabold opacity-100`}
                    onClick={() => {
                      setHide(true);
                    }}
                  >
                    Channels
                  </p>
                </Link>
                
              </div>
            </div>
          )}

          {authUser!.type === "alumni" && (
            <div className="mt-24">
              <Link href="/alumni/dashboard">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "dashboard"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Dashboard
                </p>
              </Link>
              <Link href="/alumni/donate">
                <p
                  className={`text-xl hover:text-gray-300 cursor-pointer ${
                    page === "donate"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Donate
                </p>
              </Link>
            </div>
          )}

          <div className="w-11/12 absolute bottom-5 right-0 left-0 mx-auto pt-2 pb-2 bg-white bg-opacity-5 rounded-2xl">
            <div className="w-11/12 font-bold mx-auto pl-2">
              {authUser?.name}
            </div>
            <div className=" w-11/12 text-sm mx-auto pl-2 mb-2">
              {authUser?.email}
            </div>

            <div className="bg-white rounded-3xl text-center cursor-pointer mx-auto w-11/12 left-0 right-0 shadow-md hover:bg-gray-100">
              <p
                className="text-l text-red-500 py-2 px-4"
                onClick={logOut}
              >
                Logout
              </p>
            </div>
            {authUser!.type === "user" && (
              <div className="py-2">
                <div className="bg-red-500 rounded-3xl text-center cursor-pointer mx-auto w-11/12 left-0 right-0 shadow-md hover:bg-red-300 border-2 border-red-500">
                  <p
                    className="text-xs text-white py-1 px-4"
                    onClick={()=>setDeleteAccount(true)}
                  >
                    Delete Account
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      )}

      <div
        className="col-span-12 p-2 md:hidden w-full fixed top-0 z-50"
        style={{
          background:
            "linear-gradient(to right, #003D63, #0C72B0)",
        }}
      >
        <Image
          className="ml-4 z-50"
          height={30}
          width={40}
          src={hamburger}
          onClick={() => setHide(!hide)}
        />
      </div>
      <Modal isOpen={deleteAccount == true} onClose={() => setDeleteAccount(false)}>
          <div className="p-4 md:p-5 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete account? This will permanently remove your account data within 30 days.</h3>
              <button type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={
                () => {
                  if (authUser?.email==undefined){
                    setDeleteAccount(false)
                    toast.error("Delete Account Failed!")
                  }
                  else{
                    _deleteAccount(authUser?.email)
                  }
                }
              }>
                  Delete
              </button>
              <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border ml-2 border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900" onClick={() => setDeleteAccount(false)}>Cancel</button>
          </div>
      </Modal>
    </>
    
  );
};


export default SideNav;
