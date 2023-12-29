import { Component, ReactNode, ChangeEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
//components

//interface
import { position } from '../interface/position';
import { Breadcrumb, Button } from 'flowbite-react';
// props interface
interface MyProps {
    undo: (newState: number) => void;
}
interface MyState {
    user: string
    gender: string
    userName: string
    passWord: string
    tel: number
    department: position[];
    position: position[];
    section: position[];
    error: string
    currentDepartment: string;
    currentPosition: string;
    currentSection: string;

}
class Addmember extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            user: "",
            gender: "",
            userName: "",
            passWord: "",
            tel: 0,
            department: [],
            section: [],
            position: [],
            error: "",
            currentDepartment: "ฝ่าย",
            currentPosition: "ตำแหน่ง",
            currentSection: "แผนก"

        };
    }
    componentDidMount() {
        this.fecthAll();
    }
    private fecthAll(): void {
        this.fecthDepartment();
        this.fecthPosition();
    }
    private OnSubmit: () => Promise<void> = async () => {

        await axios.post("http://localhost:8000/api/user/creation/", {
            user: this.state.user,
            userName: this.state.userName,
            passWord: this.state.passWord,
            tel: this.state.tel,
            gender: this.state.gender,
            department: this.state.currentDepartment,
            section: this.state.currentSection,
            role: this.state.currentPosition
        }).then((response:any) => {
            if (response.status === 200) {
                this.props.undo(0);
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
                    title: "เพิ่มสมาชิกสำเร็จ"
                });
            }
        }).catch((err) => {
            const message: string = err.response.data.message
            this.setState({ error: message });
            document.getElementById("alertError")?.classList.remove("hidden");

        })
    }

    private fecthDepartment: () => void = async () => {
        await axios.get(`http://localhost:8000/api/user/department/`,).then((response:any) => {
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
            if (error.response.status === 404) {
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
    private fecthPosition: () => void = async () => {
        await axios.get(`http://localhost:8000/api/user/position/`).then((response:any) => {
            if (response.status === 200) {

                const newArray: position[] = response.data.position.map((obj: position) => {
                    return {
                        ...obj
                    }
                }
                );
                this.setState({ position: newArray });

            } else {
            }

        }).catch((error) => {
            if (error.response.status === 404) {
                this.setState({ position: [] });
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
    private fecthSection: (department: string) => void = async (department) => {
        await axios.get(`http://localhost:8000/api/user/section/${department}`).then((response:any) => {
            if (response.status === 200) {

                const newArray: position[] = response.data.section.map((obj: position) => {
                    return {
                        ...obj
                    }
                }
                );
                this.setState({ section: newArray });

            } else {
            }

        }).catch((error) => {
            if (error.response.status === 404) {
                this.setState({ section: [] });
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
    private setUser: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ user: events.target.value });
    }
    private setGender: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ gender: events.target.value });
    }
    private setUserName: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ userName: events.target.value });
    }
    private setPassWord: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ passWord: events.target.value });
    }
    private setTel: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ tel: Number.parseInt(events.target.value) });
    }
    private setDepartment: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ currentDepartment: events.target.value });
        await this.fecthSection(this.state.currentDepartment);
    }
    private setSection: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ currentSection: events.target.value });
    }
    private setPostion: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ currentPosition: events.target.value });
    }

    render(): ReactNode {
        return (
            <div>
                 <h2 className="text-xl font-light">จัดการสมาชิก</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายชื่อสมาชิก</Breadcrumb.Item>
                    <Breadcrumb.Item >เพิ่มสมาชิก</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                    <div className="relative">
                            <Button onClick={() => { this.props.undo(0) }}>ย้อนกลับ</Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <form className="space-y-4" action="#">
                        <div id="alertError" className="hidden flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {this.state.error}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อในการเข้าสู่ระบบ</label>
                            <input onChange={this.setUser} type="text" name="User" id="User" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example" required />
                        </div>
                        <div className="flex">
                            <select onChange={this.setGender} id="gender" className="inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" >
                                <option selected>เพศ</option>
                                <option value="male">ชาย</option>
                                <option value="female">หญิง</option>
                            </select>
                            <input onChange={this.setUserName} type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อ-นามาสกุล" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                            <input onChange={this.setPassWord} type="password" name="password" id="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทร</label>
                            <input onChange={this.setTel} type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxx-xxxx-xxx" required />
                        </div>

                        <div className="flex">
                            <select onChange={this.setDepartment} id="department" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                <option value={this.state.currentDepartment} selected>{this.state.currentDepartment}</option>
                                {this.state.department.map((e:position, i:number) => (
                                    <option key={i} value={e.department}>
                                        {e.department}
                                    </option>
                                ))}

                            </select>
                            <select onChange={this.setSection} id="section" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                <option value={this.state.currentSection} selected>{this.state.currentSection}</option>
                                {this.state.section.map((e:position, i:number) => (
                                    <option key={i} value={e.section}>
                                        {e.section}
                                    </option>
                                ))}

                            </select>
                            <select onChange={this.setPostion} id="positon" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                <option value={this.state.currentPosition} selected>{this.state.currentPosition}</option>

                                {this.state.position.map((e:position, i:number) => (
                                    <option key={i} value={e.role}>
                                        {e.role}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <button onClick={() => { this.OnSubmit() }} type="button" className="w-full text-white bg-[#7B66FF] hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            เพิ่มสมาชิก</button>
                    </form>
                </div>

            </div>
        )
    }

}

export default Addmember;