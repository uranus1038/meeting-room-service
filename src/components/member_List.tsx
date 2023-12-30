import { Component, ReactNode, ChangeEvent } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
//cofig key
import { keyName } from '../../config-web.json'
// components
import { Avatar, Button, Select, Breadcrumb, Pagination, Alert } from 'flowbite-react';
// interface
import { user } from "../interface/accout";
import { MemberFormUpdate } from "./member_update";
import CreationForm from "./creation";
import Addmember from "./AddUser";

interface MyState {
    currentPage: number;
    rows: number;
    data: user[];
    memberData: user;
    selectedRows: boolean[];
    selectBox: boolean[];
    selectBoxAll: boolean;
    nextState: number;
    deleteUser: boolean;
    result: boolean;
}
export class MemberList extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            deleteUser: false, result: false,
            memberData: { user: "", userName: "", role: "", tel: 0, department: "", section: "", gender: "", img: "", member: "" },
            nextState: 0, rows: 10, currentPage: 1, data: [], selectedRows: [], selectBox: [], selectBoxAll: false
        }
    }
    componentDidMount() {
        this.getDataUserAll(0, 9);
    }
    private getDataUserAll: (rows_a: number, rows_b: number) => void = async (rows_a, rows_b) => {
        this.setState({ selectBox: [] });
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-user/${rows_a}/${rows_b}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response: any) => {
                    if (response.status === 200) {
                        const newArray: user[] = response.data.accouts.map((obj: user) => {
                            if (this.state.selectBox.length < response.data.accouts.length) {
                                this.state.selectBox.push(false)
                            }
                            return {
                                ...obj
                            }
                        }
                        );
                        this.setState({ data: newArray });
                        this.setState({ result: false });
                    }
                }).catch((error) => {
                    if (error.response.status === 403) {
                        localStorage.removeItem(keyName);
                        window.location.href = window.location.hostname;
                        console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

                    } else if (error.response.status === 404) {
                        this.setState({ data: [] });
                        this.setState({ result: true });
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
    private DeleteUser: (user: string) => void = async (user) => {
        this.setState({ selectBox: [] });
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/delete-member/${user}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response: any) => {
                if (response.status === 204) {
                    this.getDataUserAll(0, 9);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "ลบสมาชิกเสร็จสิ้น"
                    });
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem(keyName);
                    window.location.href = window.location.hostname;
                    console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

                } else if (error.response.status === 404) {
                    this.setState({ data: [] });
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
    private OnDeleteUser: () => Promise<void> = async () => {
        Swal.fire({
            title: "คำเตือน",
            text: "การลบสมาชิกจะทำให้คุณไม่สามารถเข้าถึงบริการหรือข้อมูลที่เกี่ยวข้องได้อีก. กรุณาทราบถึงการดำเนินการนี้.",
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
                        if (this.state.data[i].member !== "super_admin") {
                            this.DeleteUser(this.state.data[i].user);
                        } else {
                            Swal.fire({
                                title: "พบข้อผิดพลาด",
                                text: "ไม่สามารถลบสมาชิก super admin ได้",
                                icon: "error",
                                confirmButtonText: "ตกลง",
                                showConfirmButton: false,
                                showCancelButton: true,
                                cancelButtonText: "ปิด"
                            })

                        }

                    }
                })
            }
        });
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
            this.setState({ deleteUser: true });
        } else {

            this.setState({ deleteUser: false });
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
            this.setState({ selectBoxAll: false, deleteUser: false })
        } else {
            this.setState({ selectBoxAll: true, deleteUser: true })
        }
        const allAreTrue = this.state.selectBox.some(item => item === true)
        if (allAreTrue) {
            this.setState({ deleteUser: true });
        } else {

            this.setState({ deleteUser: false });
        }
    };


    private async setRows(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ rows: Number.parseInt(event.target.value) })
        if (this.state.currentPage !== 1) {

            await this.getDataUserAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getDataUserAll(0, this.state.rows - 1)
        }

    }
    private async setCurrentPage(page: number): Promise<void> {
        await this.setState({ currentPage: page })
        if (this.state.currentPage !== 1) {

            await this.getDataUserAll(((this.state.rows * this.state.currentPage)) - 1, ((this.state.rows * this.state.currentPage) + this.state.rows - 1))
        } else {
            await this.getDataUserAll(0, this.state.rows - 1)
        }
    }
    private setNextState: (newState: number) => void = (newState) => {
        this.setState({ nextState: newState });
        if (newState === 0) {
            this.getDataUserAll(0, 9);
        }
    }
    private setMemberData: (user: string, userName: string, role: string, department: string, section: string, tel: number, img: string, member: string, gender: string) => void = (user, userName, role, department, section, tel, img, member, gender) => {
        this.setState({ memberData: { user, userName, tel, role, department, section, gender, img, member } });
    }

    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                {
                    (this.state.nextState === 0) ?
                        (<>

                            <h2 className="text-xl font-light">จัดการสมาชิก</h2>
                            <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                                <Breadcrumb.Item  >
                                    หน้าหลัก
                                </Breadcrumb.Item>
                                <Breadcrumb.Item >รายชื่อสมาชิก</Breadcrumb.Item>
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
                                                (this.state.deleteUser) ?
                                                    (<Button onClick={() => { this.OnDeleteUser() }} className="bg-red-500">ลบสมาชิก</Button>
                                                    )
                                                    :
                                                    (<Button disabled className="bg-red-500">ลบสมาชิก</Button>)
                                            }
                                            <Button onClick={() => { this.setNextState(2) }}>เพิ่มสมาชิก</Button>

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
                                                ชื่อ
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                บทบาท
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                เบอร์โทร
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                แอคชั่น
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.map((element: user, index) =>
                                            (

                                                <tr key={index + 1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                    <td className="w-4 p-4">
                                                        <div className="flex items-center">
                                                            <input checked={this.state.selectBox[index]} id="checkbox-table-search-1" onChange={() => this.handleCheckboxChange(index)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label htmlFor={`checkbox-table-search-${index + 1}`} className="sr-only">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td className="w-4 p-4">
                                                        {index + 1}
                                                    </td>
                                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <Avatar alt="User settings" img="" size={"md"} rounded />
                                                        <div className="ps-3">
                                                            <div className="text-sm font-light">{element.userName}</div>
                                                            <div className="font-normal text-gray-500">@{element.user}</div>
                                                        </div>
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {element.member}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div>{element.tel}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => {
                                                            this.setMemberData(element.user, element.userName, element.role, element.department, element.section, element.tel, element.img, element.member, element.gender);
                                                            this.setNextState(1)
                                                        }} type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">แก้ไข</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>
                                {(this.state.result) ?
                                    (<Alert className="w-full" color="warning" >
                                        <span>
                                            ไม่พบข้อมูล
                                        </span>
                                    </Alert>) : null}


                            </div>
                            <div className="flex overflow-x-auto sm:justify-end mt-3">
                                <Pagination currentPage={this.state.currentPage} totalPages={100} onPageChange={(number) => { this.setCurrentPage(number) }} showIcons />
                            </div>
                        </>) :
                        ((this.state.nextState === 1) ?
                            (<MemberFormUpdate data={this.state.memberData} undo={this.setNextState} />) :
                            (<Addmember undo={this.setNextState} />))
                }

            </div>
        )
    }
} 