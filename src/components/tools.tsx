import { Component, ReactNode } from "react";
// components
'use client';
import { Avatar, Card, Button, Select, TextInput, Breadcrumb, Pagination, ButtonGroup } from 'flowbite-react';
interface MyState {
    currentPage: number
}
export class ToolComponent extends Component<{}, MyState> {
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
                <h2 className="text-xl font-light">เครื่องมือ</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >แท็กเครื่องมือ</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex items-start justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div className="font-bold text-2xl"> <i className="fas fa-tags me-3 font-bold text-2xl"></i>แท็กเครื่องมือ</div>
                </div>
                <div className="w-full p-3 h-full border-2 border-gray-300 rounded-md ">
                    <div className="relative m-2 inline-flex items-center p-2 text-sm font-bold text-start text-indigo-950 ring-2 ring-gray-200   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        จอมอนิเตอร์
                        <span className="sr-only">Notifications</span>
                        <button className="absolute inline-flex items-center justify-center w-6 h-6 text-xs hover:bg-red-600 font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">x</button>
                    </div>
                    <form>
                        <label htmlFor="default-search" className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                               <i className="fas fa-tools"></i>
                            </div>
                            <input type="search" id="default-search" className="m-1  block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="เพิ่มชื่ออุปกรณ์การใช้งาน" required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เพิ่ม</button>
                        </div>
                    </form> 
                </div>
            </div>
        )
    }
} 