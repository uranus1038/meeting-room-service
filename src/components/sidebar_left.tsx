import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
//state
interface MyState {
    eFormState: number
}
export class SidebarLeft extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            eFormState: 0,
        };
    }
    render(): ReactNode {
        return (
            <React.Fragment>
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <aside id="logo-sidebar" className=" fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 shadow drop-shadow-lg py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                        <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to={"/th/home"} relative="path" >
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group" >
                                        <span><i className="text-xl fa-solid fas fa-home textc-enter text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                        <span className="ms-3 font-medium group-hover:text-white">หน้าแรก</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fa-solid fa-chart-pie textc-enter text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                    <span className="ms-3 font-medium group-hover:text-white">แดชบอร์ด</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fa-solid fa-calendar text-center text-center text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                    <span className="ms-3 font-medium group-hover:text-white">จองห้องประชุม</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fas fa-list textcenter text-center text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                    <span className="ms-3 font-medium group-hover:text-white">รายการของฉัน</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fas fa-bell textcenter text-center text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                    <span className="flex-1  whitespace-nowrap ms-3 font-medium group-hover:text-white">การแจ้งเตือน</span>
                                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-600 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fa-brands fa-line textcenter text-center text-gray-500 w-5 h-5 group-hover:text-white"></i></span>
                                    <span className="flex-1  whitespace-nowrap ms-3 font-medium group-hover:text-white">แจ้งเตือนผ่านไลน์</span>
                                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>

                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                    <span><i className="text-xl fas fa-sign-out textcenter text-center text-gray-500 w-5 h-5 group-hover:text-black"></i></span>
                                    <span className="ms-3 font-medium group-hover:text-black">ออกจากระบบ</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </React.Fragment>

        )
    }

} 