import { Breadcrumb, Select, Button } from "flowbite-react";
import { Component, ReactNode } from "react";
//interface
import { user } from "../interface/accout";
interface MyProps
{
    data:user ; 
}
export class MemberFormUpdate extends Component<MyProps> {
    constructor(props:MyProps)
    {
        super(props);
    }
    render(): ReactNode {
        return (
            <>
                <h2 className="text-xl font-light">จัดการสมาชิก</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายชื่อสมาชิก</Breadcrumb.Item>
                    <Breadcrumb.Item >อัปเดตข้อมูลสมาชิก</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div>
                        <Select className='my-1  text-indigo-950 ' id="countries" required>
                            <option value={10} selected>แสดง 10 แถว</option>
                            <option value={20}>แสดง 20 แถว</option>
                            <option value={30}>แสดง 30 แถว</option>
                            <option value={50}>แสดง 50 แถว</option>
                        </Select>
                    </div>
                    <div className="relative">
                        <Button >ย้อนกลับ</Button>
                    </div>
                </div>
                <form className="space-y-4" action="#">
                    <div id="alertError" className="hidden flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                        </div>
                    </div>

                    <div className="flex">
                        <select id="gender" className="inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" >
                            <option selected>เพศ</option>
                            <option value="male">ชาย</option>
                            <option value="female">หญิง</option>
                        </select>
                        <input type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อ-นามาสกุล" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทร</label>
                        <input value={this.props.data.tel} type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxx-xxxx-xxx" required />
                    </div>
                    <div className="flex">
                        <select id="department" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option selected>ฝ่าย</option>

                        </select>
                        <select id="section" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option selected>---</option>

                        </select>
                        <select id="role" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option selected>---</option>

                        </select>

                    </div>
                    <Select className='my-1  text-indigo-950 ' id="countries" required>
                        <option value={10} selected>บทบาท</option>
                        <option value={20} >แสดง 20 แถว</option>
                        <option value={30}>แสดง 30 แถว</option>
                        <option value={50}>แสดง 50 แถว</option>
                    </Select>

                </form>
            </>
        )
    }
}