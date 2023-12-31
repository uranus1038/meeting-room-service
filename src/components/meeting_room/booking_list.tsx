import { Component, ReactNode } from "react";
// components
'use client';
import { Avatar,Card , Button, Select, Breadcrumb, Pagination } from 'flowbite-react';
interface MyState {
    currentPage: number
}
export class BookingComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { currentPage: 1 }
    }
    private setCurrentPage(page: number): void {
        this.setState({ currentPage: page })
    }
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                <h2 className="text-xl font-light">ข้อมูลการจองทั้งหมด</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายการจองห้องประชุม</Breadcrumb.Item>
                </Breadcrumb>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                        <div>
                            <Select className='my-1  text-indigo-950 ' id="countries" required>
                                <option >แสดง 10 แถว</option>
                                <option>แสดง 20 แถว</option>
                                <option>แสดง 30 แถว</option>
                                <option>แสดง 40 แถว</option>
                            </Select>
                        </div>
                        <div className="relative">
                            <Button>ลบ</Button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    ไอดี
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อห้องประชุม
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    สถานะ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    แอคชั่น
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    you
                                </td>
                                <td className="px-6 py-4">
                                    room
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-300 me-2"></div> รออนุมัติ
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>
                <div className="flex overflow-x-auto sm:justify-end mt-3">
                    <Pagination currentPage={this.state.currentPage} totalPages={100} onPageChange={(number) => { this.setCurrentPage(number) }} showIcons />
                </div>

            </div>
        )
    }
} 