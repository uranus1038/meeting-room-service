import { Breadcrumb, Select, Button } from "flowbite-react";
import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// key
import { keyName } from '../../config-web.json'

//interface
import { user } from "../interface/accout";
import { position } from "../interface/position";
interface MyProps {
    data: user;
    undo: (newState: number) => void;
}
interface MyState {
    userName: string;
    tel: number;
    department: position[];
}
export class MemberFormUpdate extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = { userName: this.props.data.userName, tel: this.props.data.tel, department: [] };
    }
    componentDidMount() {
        this.fecthDepartment();
    }
    private fecthDepartment: () => void = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/user/department/`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
                if (response.status === 200) {

                    const newArray: position[] = response.data.department.map((obj: position) => {
                        return {
                            ...obj
                        }
                    }
                    );
                    this.setState({ department: newArray });

                } else {
                }

            }).catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem(keyName);
                    window.location.href = window.location.hostname;
                    console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

                } else if (error.response.status === 404) {
                    this.setState({ department: [] });
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
    private async setUserName(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        await this.setState({ userName: event.target.value });
    }
    private async setTel(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        await this.setState({ tel: Number.parseInt(event.target.value) });
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
                        <Button onClick={() => { this.props.undo(0) }}>ย้อนกลับ</Button>
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
                        <input onChange={(e) => { this.setUserName(e) }} value={this.state.userName} type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อ-นามาสกุล" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทร</label>
                        <input onChange={(e) => { this.setTel(e) }} value={this.state.tel} type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxx-xxxx-xxx" required />
                    </div>
                    <div className="flex">
                        <select
                            id="department"
                            className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value={this.props.data.department} selected>
                                {this.props.data.department}
                            </option>
                            {this.state.department.map((e, i) => (
                                <option key={i} value={e.department}>
                                    {e.department}
                                </option>
                            ))}
                        </select>
                        <select id="section" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option selected>---</option>

                        </select>
                        <select id="role" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option selected>---</option>

                        </select>

                    </div>
                    <Select className='my-1  text-indigo-950 ' id="countries" required>
                        <option value={this.props.data.department} selected>{this.props.data.department}</option>
                        <option value={20} >แสดง 20 แถว</option>
                        <option value={30}>แสดง 30 แถว</option>
                        <option value={50}>แสดง 50 แถว</option>
                    </Select>

                </form>
            </>
        )
    }
}