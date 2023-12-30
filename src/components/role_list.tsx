import { ChangeEvent, Component, ReactNode } from "react";
import { FaInfo, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
//cofig key
import { keyName } from '../../config-web.json'
// components
'use client';
import { Alert, Avatar, Label, Modal, TextInput, Button, Select, Breadcrumb, ToggleSwitch, ButtonGroup } from 'flowbite-react';
//interface
import { permise } from "../interface/permission";
interface MyState {
    role: permise[];
    role_backup: permise[];
    name_role: string;
    newRole: string;
    editRole: string;
    index: number;
    isUpdate: boolean;
    openModal: boolean;
    error: string;
}
export class RoleLsit extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { editRole: "", error: "", newRole: "", isUpdate: false, index: 0, name_role: "", role: [], role_backup: [], openModal: false }
    }
    componentDidMount() {
        this.getRole();
    }
    private updateRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            this.state.role.map(async (obj: permise) => {
                if (obj.name === this.state.name_role) {
                    await axios.post(`http://localhost:8000/api/admin/update-role/`,
                        {
                            name: obj.name,
                            edit_name: this.state.editRole,
                            m_member: obj.m_member,
                            m_user: obj.m_user,
                            m_approve: obj.m_approve,
                            m_meeting_room: obj.m_meeting_room,
                            m_post: obj.m_post,
                            m_line: obj.m_line,
                            m_setting: obj.m_setting
                        },
                        { headers: { 'Authorization': `Bearer ${token}` } }
                    ).then(async (response) => {
                        if (response.status === 200) {
                            await this.getRole();
                            this.setAnimationAlert(0);
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
                                title: "แก้ไขบทบาทสำเร็จ"
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
            })

        }
    }
    private deleteRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/delete-role/${this.state.name_role}`, { headers: { 'Authorization': `Bearer ${token}` } }
            ).then((response) => {
                console.log(response);
                if (response.status === 204) {
                    this.getRole();
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
    private createRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.post(`http://localhost:8000/api/admin/create-role/`, {
                name: this.state.newRole
            },
                { headers: { 'Authorization': `Bearer ${token}` } }
            ).then((response) => {
                if (response.status === 200) {
                    this.setState({ openModal: false });
                    Swal.fire({
                        title: "สร้างบทบาทใหม่เสร็จสิ้น",
                        text: "คุณสามารถปรับแต่งบทบาทใหม่ที่คุณสร้างขึ้นได้อย่างใจชอบ.",
                        icon: "success",
                        confirmButtonText: "ตกลง",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.getRole();

                        }
                    });
                }

            }).catch((error) => {
                if (error.response.status === 403) {
                    localStorage.removeItem(keyName);
                    console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");
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
                    } else if (error.response.status === 409) {
                        this.setState({ error: error.response.data.message });
                        document.getElementById("alertError")?.classList.remove("hidden");
                    } else if (error.response.status === 400) {
                        this.setState({ error: error.response.data.message });
                        document.getElementById("alertError")?.classList.remove("hidden");
                    }

                }
            })
        }
    }
    private getRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-role/`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response: any) => {
                    if (response.status === 200) {
                        let isName: boolean = false
                        const newArray: permise[] = response.data.role.map((obj: permise) => {
                            if (obj.name !== "super_admin" && obj.name !== "member") {
                                if (!isName) {
                                    this.setState({ name_role: obj.name });
                                    this.setState({ editRole: obj.name });
                                    isName = true;
                                }
                            }
                            return {
                                ...obj
                            }
                        }
                        );
                        this.setState({ role: newArray })
                        this.setState({ role_backup: response.data.role })

                    }
                }).catch((error) => {
                    if (error.response.status === 403) {
                        localStorage.removeItem(keyName);
                        console.log("403 ไม่สามารถเข้าถึงข้อมูลได้");
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
                                    window.location.href = window.location.hostname
                                }
                            });
                        }
                    }
                })
        }
    }
    private handleSelectRole: (event: ChangeEvent<HTMLSelectElement>) => void = (event) => {
        const newArray: permise[] = this.state.role_backup.map((obj: permise) => {
            return {
                ...obj
            }
        }
        );
        this.setState({ role: newArray });
        this.setState({ name_role: event.target.value.toString() });
        this.setState({ editRole: event.target.value.toString() });
        this.setAnimationAlert(0);
    }
    private handleCheckboxChange: (state: string, index: number) => void = (state, index) => {
        const newArray: permise[] = this.state.role.map((e: permise, i: number) => {
            //#region checkBox
            if (index === i) {
                switch (state) {
                    case "m_user":
                        if (e.m_user) {
                            e.m_user = false;
                        } else {
                            e.m_user = true;
                        }
                        break;
                    case "m_member":
                        if (e.m_member) {
                            e.m_member = false;
                        } else {
                            e.m_member = true;
                        }
                        break;
                    case "m_line":
                        if (e.m_line) {
                            e.m_line = false;
                        } else {
                            e.m_line = true;
                        }
                        break;
                    case "m_approve":
                        if (e.m_approve) {
                            e.m_approve = false;
                        } else {
                            e.m_approve = true;
                        }
                        break;
                    case "m_meeting_room":
                        if (e.m_meeting_room) {
                            e.m_meeting_room = false;
                        } else {
                            e.m_meeting_room = true;
                        }
                        break;
                    case "m_post":
                        if (e.m_post) {
                            e.m_post = false;
                        } else {
                            e.m_post = true;
                        }
                        break;
                    case "m_setting":
                        if (e.m_setting) {
                            e.m_setting = false;
                        } else {
                            e.m_setting = true;
                        }
                        break;

                }
                return e;
            } else {
                return e;
            }
            //#endregion
        });

        this.setState({ role: newArray });
        this.isAlert(index);
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
    private isAlert(i: number): void {
        if (Boolean(this.state.role[i].m_approve) !== Boolean(this.state.role_backup[i].m_approve)
            || Boolean(this.state.role[i].m_line) !== Boolean(this.state.role_backup[i].m_line)
            || Boolean(this.state.role[i].m_meeting_room) !== Boolean(this.state.role_backup[i].m_meeting_room)
            || Boolean(this.state.role[i].m_member) !== Boolean(this.state.role_backup[i].m_member)
            || Boolean(this.state.role[i].m_post) !== Boolean(this.state.role_backup[i].m_post)
            || Boolean(this.state.role[i].m_setting) !== Boolean(this.state.role_backup[i].m_setting)
            || Boolean(this.state.role[i].m_user) !== Boolean(this.state.role_backup[i].m_user)
            || this.state.editRole.toString() !== this.state.name_role.toString()) {
            this.setAnimationAlert(1);
        } else {
            this.setAnimationAlert(0);

        }
        console.log(this.state.role[i].m_user + " " + Boolean(this.state.role_backup[i].m_user));

    }
    private setOpenModal(newState: boolean): void {
        this.setState({ openModal: newState });
    }
    private setNewRole: (newState: ChangeEvent<HTMLInputElement>) => Promise<void> = async (newState) => {
        await this.setState({ newRole: newState.target.value });
    }
    private setRole: (newState: ChangeEvent<HTMLInputElement>) => Promise<void> = async (newState) => {
        await this.setState({ editRole: newState.target.value });
        if (this.state.editRole !== this.state.name_role) {
            this.setAnimationAlert(1);
        } else {
            this.setAnimationAlert(0);
        }
    }
    private OnDeletePermise(): void {
        Swal.fire({
            title: "คำเตือน",
            text: `หากทำการลบบทบาท ${this.state.name_role} จะทำให้ผู้ใช้งานนี้เปลี่ยนเป็นบทบาทผู้ใช้งานทั่วไปและไม่สามารถกู้คืนบทบาทนี้แก่ผู้ใช้งานได้. กรุณาทราบถึงการดำเนินการนี้.`,
            icon: "warning",
            cancelButtonText: "ยกเลิก",
            denyButtonText: "ลบข้อมูล",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isDenied) {
                this.deleteRole();
            }
        });
    }
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">
                <h2 className="text-xl font-light">บทบาทและหน้าที่</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >บทบาท</Breadcrumb.Item>
                </Breadcrumb>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                        <div>
                            <Select value={this.state.name_role}  onChange={this.handleSelectRole} className='my-1 inline-flex text-indigo-950 ' id="countries" required>
                                {
                                    (this.state.role.length === 0) ?
                                        (<option value={"ไม่พบข้อมูล"} selected>{"ไม่พบข้อมูล"}</option>) :
                                        (<option value={this.state.name_role} selected>{this.state.name_role}</option>)
                                }
                                {
                                    this.state.role.map((e: permise, i: number) => (
                                        (e.name === "super_admin" || e.name === "member") ?
                                            (null) : (<option value={e.name}>{e.name}</option>)
                                    )
                                    )
                                }
                            </Select>
                            <TextInput
                                icon={FaEdit}
                                value={this.state.editRole}
                                onChange={this.setRole}
                                className="ms-3 inline-flex" />
                        </div>
                        <div className="relative">
                            <ButtonGroup>
                                <Button onClick={() => { this.OnDeletePermise() }}>ลบ</Button>
                                <Button onClick={() => { this.setOpenModal(true) }}>เพิ่มบทบาท</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    หน้าที่
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    แอคชั่น
                                </th>
                            </tr>
                        </thead>

                        {
                            this.state.role.map((e: permise, i: number) => (
                                (e.name === this.state.name_role) ?
                                    (<tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black">
                                                สามารถจัดการสมาชิกได้
                                            </td>

                                            <td className="px-6 py-4 ">
                                                <ToggleSwitch checked={e.m_member} onChange={() => { this.handleCheckboxChange("m_member", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black">
                                                สามารถจัดการผู้ใช้งานได้
                                            </td>
                                            <td className="px-6 py-4">
                                                <ToggleSwitch checked={e.m_user} onChange={() => { this.handleCheckboxChange("m_user", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />

                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black">
                                                สามารถอนุมัติการจองได้
                                            </td>

                                            <td className="px-6 py-4 ">
                                                <ToggleSwitch checked={e.m_approve} onChange={() => { this.handleCheckboxChange("m_approve", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />

                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black ">
                                                สามารถเพิ่มและจัดการห้องปะชุมได้
                                            </td>

                                            <td className="px-6 py-4 ">
                                                <ToggleSwitch checked={e.m_meeting_room} onChange={() => { this.handleCheckboxChange("m_meeting_room", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />

                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black">
                                                สามารถตั้งค่าแจ้งเตือนผ่านไลน์ได้
                                            </td>

                                            <td className="px-6 py-4">
                                                <ToggleSwitch checked={e.m_line} onChange={() => { this.handleCheckboxChange("m_line", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />

                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-black ">
                                                สามารถตั้งค่าและจัดการเว็บไซต์ได้
                                            </td>
                                            <td className="px-6 py-4">
                                                <ToggleSwitch checked={e.m_setting} onChange={() => { this.handleCheckboxChange("m_setting", i) }} theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" label="อนุญาติ" />

                                            </td>
                                        </tr>

                                    </tbody>) :
                                    (null)
                            ))
                        }
                    </table>
                </div>
                <Alert id="alertInfo" className="animationInfoUser w-full hidden   sticky bottom-6" additionalContent={
                    <>

                        <div className="flex justify-between items-center ">
                            <div className="mb-2 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                                <FaInfo className="me-3 inline-flex" /> ข้อมูลมีการเปลี่ยนแปลง คุณต้องการแก้ไขหรือไม่ ?
                            </div>
                            <div>
                                <button
                                    onClick={() => { this.updateRole() }}
                                    type="button"
                                    className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                                >
                                    อัปเดต
                                </button>
                            </div>

                        </div>
                    </>
                } color="warning" >
                </Alert>
                <Modal show={this.state.openModal} size="md" onClose={() => { this.setOpenModal(false) }} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
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
                                <div className="mb-2 block">
                                    <Label className="font-bold" htmlFor="user-role" value="ชื่อบทบาท" />
                                </div>
                                <TextInput
                                    value={this.state.newRole}
                                    onChange={this.setNewRole}
                                    id="user-role"
                                    type="text"
                                    required
                                />
                            </div>
                            {this.state.newRole.length > 0 || this.state.newRole !== "" ?
                                <div className="w-full">
                                    <Button onClick={this.createRole} className="w-full">สร้างบทบาทใหม่</Button>
                                </div> : <div className="w-full">
                                    <Button onClick={this.createRole} className="w-full" disabled>สร้างบทบาทใหม่</Button>
                                </div>}

                        </div>
                    </Modal.Body>
                </Modal>


            </div>
        )
    }
} 