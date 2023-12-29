import { Breadcrumb, Select, Button } from "flowbite-react";
import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../config-web.json'

//components
import { FaInfo } from 'react-icons/fa';
import { Alert } from 'flowbite-react';
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
    position: position[];
    section: position[];
    currentDepartment: string;
    currentPosition: string;
    currentSection: string;
    role: { name: string }[]
    currentRole: string
    gender: string
    error: string
}
export class MemberFormUpdate extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            error: "",
            gender: this.props.data.gender,
            role: [], currentRole: this.props.data.member,
            currentPosition: this.props.data.role, currentSection: this.props.data.section,
            currentDepartment: this.props.data.department, section: [], position: [], userName: this.props.data.userName, tel: this.props.data.tel, department: []
        };
    }
    componentDidMount() {
        this.fecthAll();
    }
    private fecthAll(): void {
        this.fecthDepartment();
        this.fecthPosition();
        this.fecthSection(this.props.data.department);
        this.fecthRole();
    }
    private updateUser: () => void = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.post(`http://localhost:8000/api/admin/update-member/`,
                {
                    u_name: this.props.data.user,
                    userName: this.state.userName,
                    gender: this.state.gender,
                    tel: this.state.tel,
                    department: this.state.currentDepartment,
                    role: this.state.currentPosition,
                    section: this.state.currentSection,
                    member: this.state.currentRole,
                }, { headers: { 'Authorization': `Bearer ${token}` } }).then((response:any) => {
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
                            title: "อัปเดตข้อมูลสมาชิกเสร็จสิ้น"
                        });

                    } else {
                    }
                }).catch((error) => {
                    if (error.response.status === 403) {
                        localStorage.removeItem(keyName);
                        window.location.href = window.location.hostname;
                        console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

                    }
                    if (error.response.status === 400) {
                        const message: string = error.response.data.message
                        this.setState({ error: message });
                        document.getElementById("alertError")?.classList.remove("hidden");

                    } else
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
                        else if (error.response.status === 500) {
                            Swal.fire({
                                title: "คำเตือน",
                                text: "ไม่สามารถอัปเดตข้อมูลผู้ใช้งานได้ พบข้อผิดพลาดของระบบเซิร์ฟเวอร์",
                                icon: "error",
                                confirmButtonText: "ตกลง",
                            })
                        }

                })
        }
    }
    private fecthRole: () => void = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/user/role/`,{ headers: { 'Authorization': `Bearer ${token}` }}).then((response:any) => {
                if (response.status === 200) {
    
                    const newArray: { name: string }[] = response.data.role.map((obj: { name: string }[]) => {
                        return {
                            ...obj
                        }
                    }
                    );
                    this.setState({ role: newArray });
    
                } else {
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem(keyName);
                    window.location.href = window.location.hostname;
                    console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");
    
                } else if (error.response.status === 404) {
                    this.setState({ role: [] });
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

    private fecthDepartment: () => void = async () => {
        await axios.get(`http://localhost:8000/api/user/department/`).then((response:any) => {
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
            if (error.response.status === 403) {
                localStorage.removeItem(keyName);
                window.location.href = window.location.hostname;
                console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

            } else if (error.response.status === 404) {
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
            if (error.response.status === 403) {
                localStorage.removeItem(keyName);
                window.location.href = window.location.hostname;
                console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");

            } else if (error.response.status === 404) {
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
    private setRole: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ currentRole: events.target.value });
        this.isAlert();
    }
    private setGender: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ gender: events.target.value });
        this.isAlert();
    }
    private async setUserName(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        await this.setState({ userName: event.target.value });
        this.isAlert();

    }
    private async setTel(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        await this.setState({ tel: Number.parseInt(event.target.value) });
        this.isAlert();
    }
    private async setCurrentDepartment(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ currentDepartment: event.target.value });
        this.fecthSection(this.state.currentDepartment);
        this.setState({ currentSection: "- - -" });
        this.isAlert();
    }
    private async setCurrentPosition(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ currentPosition: event.target.value });
        this.isAlert();
    }
    private async setCurrentSection(event: ChangeEvent<HTMLSelectElement>): Promise<void> {
        await this.setState({ currentSection: event.target.value });
        this.isAlert();
    }
    private setAnimationAlert(state: Number): void {
        switch (state) {
            case 0:
                document.getElementById("alertInfo")?.classList.add("hidden");
                break;
            case 1:
                document.getElementById("alertInfo")?.classList.remove("hidden");
                break;
        }

    }
    private isAlert(): void {
        if (this.props.data.userName !== this.state.userName) {
            this.setAnimationAlert(1)
        } else
            if (this.props.data.tel !== this.state.tel) {
                this.setAnimationAlert(1)
            } else
                if (this.props.data.department !== this.state.currentDepartment) {
                    this.setAnimationAlert(1)
                } else
                    if (this.props.data.section !== this.state.currentSection) {
                        this.setAnimationAlert(1)
                    } else
                        if (this.props.data.role !== this.state.currentPosition) {
                            this.setAnimationAlert(1)
                        } else
                            if (this.props.data.member !== this.state.currentRole) {
                                this.setAnimationAlert(1)
                            } else
                                if (this.props.data.gender !== this.state.gender) {
                                    this.setAnimationAlert(1)
                                } else {
                                    this.setAnimationAlert(0)
                                }

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
                <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                    <div className="relative">
                        <Button.Group>
                            <Button onClick={() => { this.props.undo(0) }}>ลบ</Button>

                            <Button onClick={() => { this.props.undo(0) }}>ย้อนกลับ</Button>

                        </Button.Group>
                    </div>
                </div>
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

                    <div className="flex">
                        <select onChange={this.setGender} id="gender" className="inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" >
                            <option value={this.state.gender} selected>{
                                (this.state.gender === "male") ? ("ชาย") : ("หญิง")
                            }</option>
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
                            onChange={(e) => { this.setCurrentDepartment(e) }}
                            id="department"
                            className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value={this.state.currentDepartment} selected>
                                {this.state.currentDepartment}
                            </option>
                            {this.state.department.map((e:position, i:number) => (
                                <option key={i} value={e.department}>
                                    {e.department}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e) => { this.setCurrentSection(e) }}
                            id="section" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option value={this.state.currentSection} selected>{this.state.currentSection}</option>
                            {this.state.section.map((e:position, i) => (
                                <option key={i} value={e.section}>
                                    {e.section}
                                </option>
                            ))}
                        </select>
                        <select onChange={(e) => { this.setCurrentPosition(e) }}
                            id="role" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                            <option value={this.state.currentPosition} selected>{this.state.currentPosition}</option>
                            {this.state.position.map((e:position, i:number) => (
                                <option key={i} value={e.role}>
                                    {e.role}
                                </option>
                            ))}
                        </select>

                    </div>
                    <Select onChange={(e) => { this.setRole(e) }}
                        className='my-1  text-indigo-950 ' id="countries" required>
                        {
                            (this.props.data.member === "super_admin") ?
                                (<option value={this.state.currentRole} selected>super_admin (ไม่สามารถแก้ไขได้)</option>) :
                                (<option value={this.state.currentRole} selected>{this.state.currentRole}</option>)
                        }

                        {
                            (this.props.data.member === "super_admin") ?
                                null
                                : ((this.state.role.map((e:{name:string}, i:number) => (
                                    (e.name !== "super_admin") ?
                                        (<option key={i} value={e.name}>
                                            {e.name}
                                        </option>) : null

                                ))))
                        }
                    </Select>
                    <Alert id="alertInfo" className="animationInfoUser hidden" additionalContent={
                        <>

                            <div className="flex justify-between items-center">
                                <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                                    <FaInfo className="me-3 inline-flex" /> ข้อมูลมีการเปลี่ยนแปลง คุณต้องการแก้ไขหรือไม่ ?
                                </div>
                                <div>
                                    <button
                                        onClick={() => { this.updateUser() }}

                                        type="button"
                                        className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                                    >
                                        อัปเดต
                                    </button>
                                    <button
                                        onClick={() => { this.props.undo(0) }}
                                        type="button"
                                        className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
                                    >
                                        ยกเลิก
                                    </button>
                                </div>

                            </div>
                        </>
                    } color="warning" >
                    </Alert>



                </form>

            </>
        )
    }
}