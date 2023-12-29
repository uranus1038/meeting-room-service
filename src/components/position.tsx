import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../config-web.json'
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, Pagination } from 'flowbite-react';
//interface 
import { position } from "../interface/position";
interface MyState {
    currentPage: number
    rows: number;
    positon: position[]
}
export class PositionComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { currentPage: 1, positon: [] , rows:10}
    }
    componentDidMount() {
        this.getPositionAll(0, 9);
    }
    private getPositionAll: (rows_a: number, rows_b: number) => void = async (rows_a, rows_b) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-position/${rows_a}/${rows_b}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response:any) => {
                if (response.status === 200) {
          
                        const newArray: position[] = response.data.position.map((obj: position) => {
                            return {
                                ...obj
                            }
                        }
                        );
                        this.setState({ positon: newArray });

                } else {
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    Swal.fire({
                        title: "พบข้อผิดพลาด !",
                        text: "เกิดปัญหาขึ้นทางเซิร์ฟเวอร์โปรดทำรายการใหม่ในภายหลัง",
                        icon: "error",
                        confirmButtonText: "ตกลง",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = window.location.hostname
                        }
                    });
                } else
                    if (error.response.status === 403) {
                        localStorage.removeItem(keyName);
                        console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");
                        window.location.href = window.location.hostname;

                    } else if (error.response.status === 404) {
                        this.setState({ positon: [] });
                        console.log("404 ไม่พบข้อมูล");
                    } else {
                        if (error.response.status === 401) {
                            Swal.fire({
                                title: "เซสชั่นหมดอายุ",
                                text: "เซลชั่นของคุณหมดอายุการใช้งานแล้วเพื่อรักษาข้อมูลการใช้งานของคุณเราจึงต้องมีมาตราการในการรักษาความปลอดภัยนี้",
                                icon: "warning",
                                confirmButtonText: "ตกลง",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = window.location.hostname
                                }
                            });
                        }
                    }

            })
        }
    }
    private async setRows(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ rows: Number.parseInt(event.target.value) })
        if (this.state.currentPage !== 1) {

            await this.getPositionAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getPositionAll(0, this.state.rows - 1)
        }

    }
    private async setCurrentPage(page: number): Promise<void> {
        await this.setState({ currentPage: page })
        if (this.state.currentPage !== 1) {

            await this.getPositionAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getPositionAll(0, this.state.rows - 1)
        }
    }
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                <h2 className="text-xl font-light">ตำแหน่ง</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายชื่อตำแหน่ง</Breadcrumb.Item>
                </Breadcrumb>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                        <div>
                            <Select onChange={(e) => { this.setRows(e) }} className='my-1  text-indigo-950 ' id="countries" required>
                                <option value={10} selected>แสดง 10 แถว</option>
                                <option value={20}>แสดง 20 แถว</option>
                                <option value={30}>แสดง 30 แถว</option>
                                <option value={50}>แสดง 50 แถว</option>
                            </Select>
                        </div>
                        <div className="relative">
                            <Button>เพิ่มตำแหน่ง</Button>
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
                                    รหัสตำแหน่ง
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    รายชื่อตำแหน่ง
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    หมายเหตุ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    แอคชั่น
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.positon.map((element: position, i) =>
                                (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {element.code}
                                        </td>
                                        <td className="px-6 py-4">
                                            {element.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {element.note}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</a>
                                        </td>
                                    </tr>
                                )

                                )
                            }


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