import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../../config-web.json'
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, Pagination, ThemeModeScript } from 'flowbite-react';
import { AddSection } from "./section_add";
import { UpdateSection } from "./section_update";
//interface 
import { position } from "../../interface/position";

interface MyState {
    currentPage: number
    rows: number;
    nextState: number;
    section: position[]
    section_props: string;
    code: string;
    department: string;
    note: string
    selectBox: boolean[];
    selectBoxAll: boolean;
    deleteSection: boolean;
}

export class SectionComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            deleteSection: false,
            nextState: 0,
            selectBox: [],
            selectBoxAll: false,
            code: "",
            section_props: "",
            department: "",
            note: "",
            rows: 10,
            currentPage: 1,
            section: [],
        }
    }
    componentDidMount() {
        this.getSectionAll(0, 9);
    }
    private getSectionAll: (rows_a: number, rows_b: number) => void = async (rows_a, rows_b) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            this.setState({ selectBox: [] });
            this.setState({ deleteSection: false })
            this.setState({ selectBoxAll: false })
            await axios.get(`http://localhost:8000/api/admin/get-section/${rows_a}/${rows_b}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
                if (response.status === 200) {
                    const newArray: position[] = response.data.section.map((obj: position) => {
                        if (this.state.selectBox.length < response.data.section.length) {
                            this.state.selectBox.push(false)
                        }
                        return {
                            ...obj
                        }
                    }
                    );
                    this.setState({ section: newArray });
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
                        this.setState({ section: [] });
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
    private disSection: (section: string, callback: (callback: any) => void) => void = async (section, callback) => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/delete-section/${section}`, { headers: { 'Authorization': `Bearer ${token}` } }
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
    private OnDisSection: () => Promise<void> = async () => {
        let totalCalls: number = 0;
        let completedCalls: number = 0;
        Swal.fire({
            title: "คำเตือน",
            text: "การลบชื่อแผนกนี้จะไม่ส่งผลกระทบต่อผู้ใช้งาน และชื่อแผนกนี้จะยังคงอยู่ในระบบของผู้ใช้งานจนกว่าจะมีการเปลี่ยนแปลงของผู้ใช้งาน. กรุณาทราบถึงการดำเนินการนี้.",
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
                        this.disSection(this.state.section[i].section, () => {
                            completedCalls++;
                            if (completedCalls === totalCalls) {
                                this.getSectionAll(0, 9);
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
            this.setState({ deleteSection: true });
        } else {

            this.setState({ deleteSection: false });
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
            this.setState({ selectBoxAll: false, deleteSection: false })
        } else {
            this.setState({ selectBoxAll: true, deleteSection: true })
        }
        const allAreTrue = this.state.selectBox.some(item => item === true)
        if (allAreTrue) {
            this.setState({ deleteSection: true });
        } else {

            this.setState({ deleteSection: false });
        }
    };
    private async setRows(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ rows: Number.parseInt(event.target.value) })
        if (this.state.currentPage !== 1) {

            await this.getSectionAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getSectionAll(0, this.state.rows - 1)
        }

    }
    private async setCurrentPage(page: number): Promise<void> {
        await this.setState({ currentPage: page })
        if (this.state.currentPage !== 1) {

            await this.getSectionAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getSectionAll(0, this.state.rows - 1)
        }
    }
    private setNextState: (newState: number) => void = (newState) => {
        this.setState({ nextState: newState });
    }
    private setDataSection: (code: string, section_props: string, department: string, note: string) => void = (code, section_props, department, note) => {
        this.setState({ code, section_props, department, note });
    }
    render(): ReactNode {
        return (

            <div className="ms-72 p-6">
                {
                    (this.state.nextState === 0) ?
                        (<>
                            <h2 className="text-xl font-light">แผนก</h2>
                            <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                                <Breadcrumb.Item  >
                                    หน้าหลัก
                                </Breadcrumb.Item>
                                <Breadcrumb.Item >รายชื่อแผนก</Breadcrumb.Item>
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
                                        <Button.Group>
                                            {
                                                (this.state.deleteSection) ?
                                                    (<Button onClick={() => { this.OnDisSection()}} className="bg-red-500">ลบสมาชิก</Button>
                                                    )
                                                    :
                                                    (<Button disabled className="bg-red-500">ลบฝ่าย</Button>)
                                            }
                                            <Button onClick={() => { this.setNextState(1) }}>เพิ่มแผนก</Button>
                                        </Button.Group>

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
                                                รหัสแผนก
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                ชื่อแผนก
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                ฝ่าย
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
                                            this.state.section.map((e, i) => (
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
                                                        {e.code}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {e.section}
                                                    </td> <td className="px-6 py-4">
                                                        {e.department}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {e.note}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => {
                                                            this.setDataSection(e.code, e.section, e.department, e.note)
                                                            this.setNextState(2);
                                                        }} type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</button>
                                                    </td>
                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </table>

                            </div>
                            <div className="flex overflow-x-auto sm:justify-end mt-3">
                                <Pagination currentPage={this.state.currentPage} totalPages={100} onPageChange={(number) => { this.setCurrentPage(number) }} showIcons />
                            </div>
                        </>) :
                        ((this.state.nextState === 1) ?
                            (<AddSection getSectionAll={this.getSectionAll} undo={this.setNextState} />) :
                            (<UpdateSection code={this.state.code} section={this.state.section_props} department={this.state.department} note={this.state.note} getSectionAll={this.getSectionAll} undo={this.setNextState} />)
                        )
                }


            </div>
        )
    }
} 