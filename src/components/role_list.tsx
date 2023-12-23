import { Component, ReactNode } from "react";
// components
'use client';
import { Avatar, Button, Select, Breadcrumb, ToggleSwitch } from 'flowbite-react';
interface MyState {
    switch1: boolean
}
export class RoleLsit extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { switch1: false }
    }
    private setSwitch1(newState: boolean): void {
        this.setState({ switch1: newState })
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
                                <option >admin</option>
                                <option>แสดง 20 แถว</option>
                                <option>แสดง 30 แถว</option>
                                <option>แสดง 40 แถว</option>
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


                                <td className="px-6 py-4 ">
                                    React Developer
                                </td>

                                <td className="px-6 py-4 ">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">


                                <td className="px-6 py-4 ">
                                    React Developer
                                </td>

                                <td className="px-6 py-4">
                                    <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch1(e) }} label="อนุญาติ" />

                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">


                                <td className="px-6 py-4 ">
                                    React Developer
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