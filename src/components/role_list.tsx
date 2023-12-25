import { Component, ReactNode } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
//cofig key
import { keyName } from '../../config-web.json'
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, ToggleSwitch } from 'flowbite-react';
//interface
import { permise } from "../interface/permission";
interface MyState {
    switch1: boolean
    role : permise[]
}
export class RoleLsit extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { switch1: false ,role:[]}
    }
    private setSwitch1(newState: boolean): void {
        this.setState({ switch1: newState })
    }
    componentDidMount()
    {
        this.getRole();
    }
    private getRole: () => Promise<void> = async () => {
        if (localStorage.getItem(keyName) !== null) {
            const token = localStorage.getItem(keyName);
            await axios.get(`http://localhost:8000/api/admin/get-role/`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
                if (response.status === 200) {
                    this.setState({role:response.data.role})                    
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
                            <Select className='my-1  text-indigo-950 ' id="countries" required>
                                {
                                    this.state.role.map((e,i)=>(
                                        <option key={i} value={e.name}>{e.name}</option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="relative">
                            <Button>เพิ่มบทบาท</Button>
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
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black">
                                    สามารถจัดการสมาชิกได้
                                </td>

                                <td className="px-6 py-4 ">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black">
                                    สามารถจัดการผู้ใช้งานได้
                                </td>
                                <td className="px-6 py-4">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black">
                                    สามารถอนุมัติการจองได้
                                </td>

                                <td className="px-6 py-4 ">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black ">
                                    สามารถเพิ่มและจัดการห้องปะชุมได้
                                </td>

                                <td className="px-6 py-4 ">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black">
                                    สามารถตั้งค่าแจ้งเตือนผ่านไลน์ได้
                                </td>

                                <td className="px-6 py-4">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black ">
                                    สามารถตั้งค่าและจัดการเว็บไซต์ได้
                                </td>
                                <td className="px-6 py-4">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-black ">
                                    แอดมิน
                                </td>
                                <td className="px-6 py-4">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>


            </div>
        )
    }
} 