import { FC } from 'react';
import { BrowserRouter as Navigate } from "react-router-dom";

export const Navbar: FC = () => {
    return (
        <>
            <nav className=' pt-2 pb-2 px-3.5 bg-blue-600 w-screen   '>
                <div className='justify-between flex items-center'>
                    <p className='text-xs text-white font-medium'>ระบบจองห้องประชุมออนไลน์ ในรูปแบบเว็บไซต์สำเร็จรูป รองรับการจองห้องประชุมได้ตลอด 24 ชั่วโมง</p>
                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
                        className="text-white  hover:text-slate-200  font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <i className='fas fa-question-circle text-xl'></i>
                    </button>
                    <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className='fas fa-info-circle'></i > ความช่วยเหลือ</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className='fas fa-comment-alt'></i> ติดต่อเรา</a>
                            </li>
                        </ul>
                    </div>
                </div>



            </nav>
            <nav className='  p-3.5 bg-blue-700 w-screen  '>
                <div className='justify-between flex items-center'>
                    <div >
                        <a className='text-base font-bold text-white me-7'>Navbar Icon</a>
                    </div>

                    <div >
                        <button type="button" className="text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center me-2 mb-2 ">
                            จองห้องประชุม</button>
                        <button type="button" className="text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center me-2 mb-2 ">
                            ห้องประชุม+สถานที่</button>
                        <button type="button" className="text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center me-2 mb-2 ">
                            กิจกรรม/ข่าวประชาสัมพันธ์</button>
                        <button type="button" className="text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center me-2 mb-2 ">
                            เกี่ยวกับ</button>
                        <button type="button" className="text-white  hover:text-blue-700 border border-white hover:bg-white    font-medium rounded-full text-sm px-5 py-1.5   ">
                            <i className='fas fa-user-circle '></i> ลงทะเบียน / เข้าสู่ระบบ</button>
                    </div>
                </div>

            </nav>

        </>
    )
} 