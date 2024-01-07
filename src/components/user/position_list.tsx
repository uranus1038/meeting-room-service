import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../../config-web.json'
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, Pagination } from 'flowbite-react';
//interface 
import { position } from "../../interface/position";
import { AddPosition } from "./position_add";
import { UpdatePosition } from "./position_update";
interface MyState {
    code: string;
    role: string;
    note: string;
    currentPage: number;
    rows: number;
    positon: position[]
    nextState: number;
    selectBox: boolean[];
    selectBoxAll: boolean;
    deleteRole: boolean;
}
export class PositionComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { role: "", code: "", nextState: 0, selectBox: [], selectBoxAll: false, note: "", deleteRole: false, currentPage: 1, positon: [], rows: 10 }
    }
    componentDidMount() {
        this.getPositionAll(0, 9);
    }
    private getPositionAll: (rows_a: number, rows_b: number) => void = async (rows_a, rows_b) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            this.setState({ selectBox: [] });
            this.setState({ deleteRole: false })
            this.setState({ selectBoxAll: false })
            await axios.get(`http://localhost:8000/api/admin/get-position/${rows_a}/${rows_b}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response: any) => {
                if (response.status === 200) {
                    const newArray: position[] = response.data.position.map((obj: position) => {
                        if (this.state.selectBox.length < response.data.position.length) {
                            this.state.selectBox.push(false)
                        }
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
    private disPosition: (role: string, callback: (callback: any) => void) => void = async (role, callback) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/delete-position/${role}`, { headers: { 'Authorization': `Bearer ${token}` } }
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
    private OnDisPosition: () => Promise<void> = async () => {
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
                        this.disPosition(this.state.positon[i].role, () => {
                            completedCalls++;
                            if (completedCalls === totalCalls) {
                                this.getPositionAll(0, 9);
                            }
                        });
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
            this.setState({ deleteRole: true });
        } else {

            this.setState({ deleteRole: false });
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
            this.setState({ selectBoxAll: false, deleteRole: false })
        } else {
            this.setState({ selectBoxAll: true, deleteRole: true })
        }
        const allAreTrue = this.state.selectBox.some(item => item === true)
        if (allAreTrue) {
            this.setState({ deleteRole: true });
        } else {

            this.setState({ deleteRole: false });
        }
    };
    private setNextState: (newState: number) => void = (newState) => {
        this.setState({ nextState: newState });
    }
    private setDataPosition: (code: string, role: string, note: string) => void = (code, role, note) => {
        this.setState({ code, role, note });
    }
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                {
                    (this.state.nextState === 0) ?
                        (<>
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
                                    <Button.Group>
                                        {
                                            (this.state.deleteRole) ?
                                                (<Button onClick={() => { this.OnDisPosition() }} className="bg-red-500">ลบตำแหน่ง</Button>
                                                )
                                                :
                                                (<Button disabled className="bg-red-500">ลบตำแหน่ง</Button>)
                                        }
                                        <Button onClick={() => { this.setNextState(1) }}>เพิ่มฝ่าย</Button>

                                    </Button.Group>
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
                                                <tr key={i + 1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="w-4 p-4">
                                                        <div className="flex items-center">
                                                            <input checked={this.state.selectBox[i]} id="checkbox-table-search-1" onChange={() => this.handleCheckboxChange(i)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label htmlFor={`checkbox-table-search-${i + 1}`} className="sr-only">checkbox</label>
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
                                                        <button onClick={() => {
                                                            this.setDataPosition(element.code, element.role, element.note)
                                                            this.setNextState(2)
                                                        }}
                                                            type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</button>
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

                        </>) :
                        ((this.state.nextState === 1) ? (<AddPosition getPositionAll={this.getPositionAll}
                            undo={this.setNextState} />)
                            :
                            (<UpdatePosition role={this.state.role} note={this.state.note} code={this.state.code} getPositionAll={this.getPositionAll} undo={this.setNextState} />))
                }

            </div>
        )
    }
} 