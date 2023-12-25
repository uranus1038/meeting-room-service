import React, { Component, ReactNode } from 'react';
import { Sidebar, Avatar, SidebarCollapse, Badge, SidebarItem } from 'flowbite-react';
import {

    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiUserGroup
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
//interface user
import { user } from '../interface/accout';
interface MyProps {
    dataUser: user
    setDataUser(data: user): void;
    newLink: (newState: number) => void;
}
//state
interface MyState {
    eFormState: number

}
export class SidebarLeftAdmin extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            eFormState: 0,
        };
    }
    render(): ReactNode {
        return (
            <React.Fragment>
                <Sidebar className='drop-shadow-lg h-screen fixed w-72 z-20' aria-label="Default sidebar example">
                    <div className="flex flex-col items-center  pt-6 mb-3">
                        <Avatar size="lg" status='online' img="" rounded> </Avatar>
                        <h5 className="mb-1 text-medium font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                        <Link to={""}>
                            <a className="hover:text-blue-800 hover:font-bold text-sm text-gray-500 dark:text-gray-400">จัดการโปรไฟล์</a>
                        </Link>

                    </div>
                    <hr />
                        <Sidebar.ItemGroup>
                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>แดชบอร์ด</span></Sidebar.Item>
                            <Link to={"/th/home"}><Sidebar.Item><i className=' fas  fa-home me-2'></i><span className="text-sm">หน้าแรก</span></Sidebar.Item></Link>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(0) }}><Sidebar.Item ><i className='fas fa-chart-pie me-2'></i><span className="text-sm">แดชบอร์ด</span></Sidebar.Item></button>
                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>ผู้ใช้งาน</span></Sidebar.Item>
                            <button className='w-full text-start ' onClick={() => { this.props.newLink(1) }}>
                                <SidebarItem ><i className='fas fa-user me-2 '></i><span className="text-sm">
                                    จัดการสมาชิก</span></SidebarItem></button>

                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(2) }}>
                                <Sidebar.Item href="#"><i className="fa-solid fa-address-book me-2"></i><span className="text-sm">บทบาทและหน้าที่  </span></Sidebar.Item>
                            </button>

                            <SidebarCollapse

                                className='text-sm'
                                theme={{ icon: { base: "h-5 w-5 mb-1 ms-3" } }}
                                icon={HiUserGroup}
                                label="ผู้ใช้งาน"
                                renderChevronIcon={(theme, open) => {
                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                }}
                            >
                                <button className='w-full text-start '
                                    onClick={() => { this.props.newLink(3) }}>
                                    <Sidebar.Item ><i className='fas fa-pen me-2 '></i><span className="text-sm"> ฝ่าย</span></Sidebar.Item>
                                </button>
                                <button className='w-full text-start '
                                    onClick={() => { this.props.newLink(4) }}>
                                    <Sidebar.Item ><i className='fas fa-pen me-2 '></i><span className="text-sm"> แผนก</span></Sidebar.Item>
                                </button>
                                <button className='w-full text-start '
                                    onClick={() => { this.props.newLink(5) }}>

                                    <Sidebar.Item ><i className='fas fa-pen me-2 '></i><span className="text-sm"> ตำแหน่ง</span></Sidebar.Item>
                                </button>
                            </SidebarCollapse>

                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>จองห้องประชุม</span></Sidebar.Item>
                            <button className='w-full text-start '
                                    onClick={() => { this.props.newLink(6) }}>
                            <Sidebar.Item><i className='fas fa-calendar me-2'></i><span className="text-sm"> จองห้องประชุม</span></Sidebar.Item>
                            </button>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(7) }}>
                            <Sidebar.Item ><i className="fa-solid fa-calendar-check me-2"></i><span className="text-sm"> อนุมัติการจอง</span></Sidebar.Item>
                            </button>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(8) }}>
                            <Sidebar.Item ><i className="fa-solid fa-table me-2"></i><span className="text-sm"> ข้อมูลการจองทั้งหมด</span></Sidebar.Item>
                            </button>
                            
                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>ห้องประชุม</span></Sidebar.Item>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(9) }}>
                            <Sidebar.Item ><i className="fa-solid fa-vector-square me-2"></i><span className="text-sm"> ข้อมูลห้องประชุม</span></Sidebar.Item>
                            </button>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(10) }}>
                            <Sidebar.Item ><i className="fa-solid fa-tablet-screen-button me-2"></i><span className="text-sm"> เครื่องมือ</span></Sidebar.Item>
                            </button>
                            <button className='w-full text-start '
                                onClick={() => { this.props.newLink(11) }}>
                            <Sidebar.Item ><i className="fa-solid fa-wifi me-2"></i><span className="text-sm"> บริการอื่นๆ</span></Sidebar.Item>
                            </button>
                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>กิจกรรม</span></Sidebar.Item>
                            <Sidebar.Item ><i className="fa-solid fa-paper-plane  me-2"></i><span className="text-sm"> โพสต์กิจกรรม</span></Sidebar.Item>

                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>ตั้งค่า</span></Sidebar.Item>
                            <Sidebar.Item ><i className="fa-solid fa-gear  me-2"></i><span className="text-sm"> ตั้งค่าเว็บไซต์</span></Sidebar.Item>
                            <Link to={"/th/home"}>
                                <Sidebar.Item label="new" labelColor="red"><i className='fa-brands fa-line me-2'></i><span className="text-sm">การแจ้งเตือนผ่านไลน์</span></Sidebar.Item>
                            </Link>
                            <hr />
                            <Sidebar.Item href="#" ><i className='fas fa-sign-out me-2'></i>ออกจากระบบ</Sidebar.Item>

                        </Sidebar.ItemGroup>
                    <Sidebar.CTA>
                        <div className="mb-3 flex items-center"><Badge color="warning">Beta</Badge></div>
                        <div className="mb-3 text-sm text-indigo-950 dark:text-gray-400">
                            Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your
                            profile.
                        </div>
                        <a
                            className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
                            href="#"
                        >
                            Turn new navigation off
                        </a>
                    </Sidebar.CTA>
                </Sidebar>

            </React.Fragment>

        )
    }

} 