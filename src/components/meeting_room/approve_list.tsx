import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../../config-web.json'
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, Pagination } from 'flowbite-react';
import { reserve } from "../../interface/reserve";
interface MyState {
    currentPage: number;
    rows: number;
    nextState: number;
    selectBox: boolean[];
    selectBoxAll: boolean;
    deleteBooking: boolean;
    ApproveBookingAll: reserve[];
}
export class ApproveComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state =
        {
            rows: 0,
            currentPage: 1,
            nextState: 0,
            selectBox: [],
            selectBoxAll: false,
            deleteBooking: false,
            ApproveBookingAll: []
        }
    }
    componentDidMount() {
        this.getApproveBookingAll(0, 9)
    }
    private getApproveBookingAll: (rows_a: number, rows_b: number) => void = async (rows_a, rows_b) => {
        this.setState({ selectBox: [] });
        this.setState({ selectBoxAll: false })
        this.setState({ deleteBooking: false })
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-approve/${rows_a}/${rows_b}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
                if (response.status === 200) {
                    const newArray: reserve[] = response.data.booking.map((obj: reserve) => {
                        if (this.state.selectBox.length < response.data.booking.length) {
                            this.state.selectBox.push(false)
                        }
                        return {
                            ...obj
                        }
                    }
                    );
                    this.setState({ ApproveBookingAll: newArray });
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
                        this.setState({ ApproveBookingAll: [] });
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
    private disDepartment: (department: string, callback: (callback: any) => void) => void = async (department, callback) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/delete-department/${department}`, { headers: { 'Authorization': `Bearer ${token}` } }
            ).then((response) => {
                console.log(response);
                if (response.status === 204) {
                    callback("process successed");
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "ลบบทบาทเสร็จสิ้น"
                    });
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem(keyName);
                    Swal.fire({
                        title: "แจ้งเตือน",
                        text: "คุณไม่ได้รับอนุญาติให้แก้ไขข้อมูลนี้",
                        icon: "error",
                        confirmButtonText: "ตกลง",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = window.location.hostname;
                        }
                    });

                    window.location.href = window.location.hostname;
                } else {
                    if (error.response.status === 401) {
                        Swal.fire({
                            title: "เซสชั่นหมดอายุ",
                            text: "เซลชั่นของคุณหมดอายุการใช้งานแล้วเพื่อรักษาข้อมูลการใช้งานของคุณเราจึงต้องมีมาตราการในการรักษาความปลอดภัยนี้",
                            icon: "warning",
                            confirmButtonText: "ตกลง",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = window.location.hostname;
                            }
                        });
                    }
                }
            })
        }
    }
    private OnDisDepartment: () => Promise<void> = async () => {
        let totalCalls: number = 0;
        let completedCalls: number = 0;
        Swal.fire({
            title: "คำเตือน",
            text: "การลบชื่อฝ่ายนี้จะไม่ส่งผลกระทบต่อผู้ใช้งาน และชื่อฝ่ายนี้จะยังคงอยู่ในระบบของผู้ใช้งานจนกว่าจะมีการเปลี่ยนแปลงของผู้ใช้งาน. กรุณาทราบถึงการดำเนินการนี้.",
            icon: "warning",
            cancelButtonText: "ยกเลิก",
            denyButtonText: "ลบข้อมูล",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isDenied) {
                this.state.selectBox.map((element: boolean, i) => {
                    if (element) {
                        totalCalls++
                        // this.disDepartment(this.state.department[i].department, () => {
                        //     completedCalls++;
                        //     if (completedCalls === totalCalls) {
                        //         this.getApproveBookingAll(0, 9);
                        //     }
                        // });
                    }
                })
            }
        })
    }
    private handleCheckboxChange: (index: number) => Promise<void> = async (index) => {
        const newArray: boolean[] = this.state.selectBox.map((element: boolean, i) => {
            if (index === i) {

                if (element) {
                    element = false;
                    return element
                } else {
                    element = true;
                    return element
                }
            } else {
                return element;
            }
        })

        await this.setState({ selectBox: newArray })
        const allAreTrue = this.state.selectBox.some(item => item === true)
        if (allAreTrue) {
            this.setState({ deleteBooking: true });
        } else {

            this.setState({ deleteBooking: false });
        }
    };
    private handleSelectAll: () => Promise<void> = async () => {
        const newArray: boolean[] = this.state.selectBox.map((element: boolean) => {
            if (this.state.selectBoxAll) {
                element = false;
                return element
            } else {
                element = true;
                return element
            }
        });
        await this.setState({ selectBox: newArray })
        console.log(this.state.selectBox);

        if (this.state.selectBoxAll) {
            this.setState({ selectBoxAll: false, deleteBooking: false })
        } else {
            this.setState({ selectBoxAll: true, deleteBooking: true })
        }
        const allAreTrue = this.state.selectBox.some(item => item === true)
        if (allAreTrue) {
            this.setState({ deleteBooking: true });
        } else {

            this.setState({ deleteBooking: false });
        }
    };
    private async setRows(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ rows: Number.parseInt(event.target.value) })
        if (this.state.currentPage !== 1) {

            await this.getApproveBookingAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getApproveBookingAll(0, this.state.rows - 1)
        }

    }
    private async setCurrentPage(page: number): Promise<void> {
        await this.setState({ currentPage: page })
        if (this.state.currentPage !== 1) {

            await this.getApproveBookingAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getApproveBookingAll(0, this.state.rows - 1)
        }
    }
    private setNextState: (newState: number) => void = (newState) => {
        this.setState({ nextState: newState });
    }
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                <h2 className="text-xl font-light">อนุมัติการจอง</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายการรอนุมัติ</Breadcrumb.Item>
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
                            <Button>ลบ</Button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input checked={this.state.selectBoxAll} onChange={this.handleSelectAll} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                    วันที่
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    เวลา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    หัวข้อ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อห้องประชุม
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    แอคชั่น
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.ApproveBookingAll.map((element: reserve, index:number) => (
                                    (element.isApprove === true) ? (null) :
                                        (<tr key={index+1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                            {index+1} 
                                            </td>
                                            <td className="px-6 py-4">
                                            {element.userName} 
                                            </td>
                                            <td className="px-6 py-4">
                                            {element.start_date} - {element.end_date}  
                                            </td>
                                            <td className="px-6 py-4">
                                            {element.start_time} - {element.end_time}  
                                            </td>
                                            <td className="px-6 py-4">
                                                {element.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element.room}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</a>
                                            </td>
                                        </tr>)
                                ))
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