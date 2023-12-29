import { ChangeEvent, Component, ReactNode } from "react";
import { FaInfo } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2'
//cofig key
import { keyName } from '../../config-web.json'
// components
'use client';
import { Alert, Avatar,Label, Modal, TextInput , Button, Select, Breadcrumb, ToggleSwitch, ButtonGroup } from 'flowbite-react';
//interface
import { permise } from "../interface/permission";
interface MyState {
    role: permise[];
    role_b: permise[];
    name_r: string;
    index: number;
    isUpdate: boolean;
    openModal:boolean ; 
}
export class RoleLsit extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { isUpdate: false, index: 0, name_r: "", role: [], role_b: [] , openModal:false }
    }
    componentDidMount() {
        this.getRole();
    }
    private getRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-role/`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response: any) => {
                if (response.status === 200) {
                    let isName: boolean = false
                    const newArray: permise[] = response.data.role.map((obj: permise) => {
                        if (obj.name !== "super_admin" && obj.name !== "member") {
                            if (!isName) {
                                this.setState({ name_r: obj.name });
                                isName = true;
                            }
                        }
                        return {
                            ...obj
                        }
                    }
                    );
                    this.setState({ role: newArray })
                    this.setState({ role_b: response.data.role })

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
        const newArray: permise[] = this.state.role_b.map((obj: permise) => {
            return {
                ...obj

            }
        }
        );
        this.setState({ role: newArray });
        this.setState({ name_r: event.target.value.toString() });
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
        if (Boolean(this.state.role[i].m_approve) !== Boolean(this.state.role_b[i].m_approve)
            || Boolean(this.state.role[i].m_line) !== Boolean(this.state.role_b[i].m_line)
            || Boolean(this.state.role[i].m_meeting_room) !== Boolean(this.state.role_b[i].m_meeting_room)
            || Boolean(this.state.role[i].m_member) !== Boolean(this.state.role_b[i].m_member)
            || Boolean(this.state.role[i].m_post) !== Boolean(this.state.role_b[i].m_post)
            || Boolean(this.state.role[i].m_setting) !== Boolean(this.state.role_b[i].m_setting)
            || Boolean(this.state.role[i].m_user) !== Boolean(this.state.role_b[i].m_user)) {
            this.setAnimationAlert(1);
        } else {
            this.setAnimationAlert(0);

        }
        console.log(this.state.role[i].m_user + " " + Boolean(this.state.role_b[i].m_user));

    }
    private setOpenModal(newState:boolean):void
    {
        this.setState({openModal:newState});
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
                            <Select onChange={this.handleSelectRole} className='my-1  text-indigo-950 ' id="countries" required>
                                {
                                    (this.state.role.length === 0) ?
                                        (<option value={"ไม่พบข้อมูล"} selected>{"ไม่พบข้อมูล"}</option>) :
                                        (<option value={this.state.name_r} selected>{this.state.name_r}</option>)
                                }

                                {

                                    this.state.role.map((e: permise, i: number) => (
                                        (e.name === "super_admin" || e.name === "member") ?
                                            (null) : (<option value={e.name}>{e.name}</option>)
                                    )
                                    )
                                }
                            </Select>
                        </div>
                        <div className="relative">
                            <ButtonGroup>
                                <Button>ลบ</Button>
                                <Button onClick={()=>{this.setOpenModal(true)}}>เพิ่มบทบาท</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                (e.name === this.state.name_r) ?
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
                <Alert id="alertInfo" className="animationInfoUser mt-5 hidden" additionalContent={
                    <>

                        <div className="flex justify-between items-center">
                            <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                                <FaInfo className="me-3 inline-flex" /> ข้อมูลมีการเปลี่ยนแปลง คุณต้องการแก้ไขหรือไม่ ?
                            </div>
                            <div>
                                <button
                                    // onClick={() => { this.updateUser() }}

                                    type="button"
                                    className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                                >
                                    อัปเดต
                                </button>
                                <button
                                    //onClick={() => { this.props.undo(0) }}
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
                <Modal show={this.state.openModal} size="md" onClose={()=>{this.setOpenModal(false)}} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="user-role" value="ชื่อบทบาท" />
                                </div>
                                <TextInput
                                    id="user-role"
                                  type="text"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Button className="w-full">สร้างบทบาทใหม่</Button>
                            </div>
                            
                        </div>
                    </Modal.Body>
                </Modal>


            </div>
        )
    }
} 