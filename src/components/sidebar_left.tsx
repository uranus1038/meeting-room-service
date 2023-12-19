import React, { Component, ReactNode } from 'react';
import { Sidebar, Avatar, SidebarCollapse } from 'flowbite-react';
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
}
//state
interface MyState {
    eFormState: number
}
export class SidebarLeft extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            eFormState: 0,
        };
    }
    render(): ReactNode {
        return (
            <React.Fragment>
                <Sidebar className='drop-shadow-lg h-screen fixed w-72' aria-label="Default sidebar example">
                    <div className="flex flex-col items-center  pt-6 mb-3">
                        <Avatar size="lg" status='online' img="" rounded> </Avatar>
                        <h5 className="mb-1 text-medium font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                        <Link to={""}>
                            <a className="hover:text-blue-800 hover:font-bold text-sm text-gray-500 dark:text-gray-400">จัดการโปรไฟล์</a>
                        </Link>

                    </div>
                    <hr />
                    <Sidebar.Items className='mt-5'>
                        <Sidebar.ItemGroup>
                            {
                                (this.props.dataUser.member === "member") ?
                                    (
                                        <>
                                            <Link to={"/th/home"}><Sidebar.Item><i className='fas fa-home me-2 '></i>หน้าแรก</Sidebar.Item></Link>
                                            <Link to={"/th/home"}><Sidebar.Item><i className='fas fa-calendar me-2'></i>จองห้องประชุม</Sidebar.Item></Link>
                                            <Link to={"/th/home"}><Sidebar.Item><i className="fa-solid fa-clipboard-list me-2"></i>รายการของฉัน</Sidebar.Item></Link>
                                            <Link to={"/th/home"}><Sidebar.Item href="#" label="3" ><i className='fas fa-bell me-2'></i>การแจ้งเตือน</Sidebar.Item></Link>
                                            <Link to={"/th/home"}><Sidebar.Item label="PRO" labelColor="red"><i className='fa-brands fa-line me-2'></i>การแจ้งเตือนผ่านไลน์</Sidebar.Item></Link>
                                        </>
                                    ) : (
                                        <>
                                            <Sidebar.Item ><span className='text-xs font-medium'>แดชบอร์ด</span></Sidebar.Item>
                                            <Link to={"/th/home"}><Sidebar.Item><i className='fas fa-home me-2'></i>หน้าแรก</Sidebar.Item></Link>
                                            <Sidebar.Item href="#"><i className='fas fa-user me-2'></i>แดชบอร์ด</Sidebar.Item>

                                            <Sidebar.Item ><span className='text-xs font-medium'>ผู้ใช้งาน</span></Sidebar.Item>
                                            <Sidebar.Item href="#"><i className='fas fa-user me-2'></i>จัดการสมาชิก</Sidebar.Item>
                                            <Sidebar.Item href="#"><i className="fa-solid fa-address-book me-2"></i>บทบาทและหน้าที่</Sidebar.Item>

                                            <SidebarCollapse
                                                theme={{ icon: { base: "h-5 w-5 mb-1 ms-3" } }}
                                                icon={HiUserGroup}
                                                label="ผู้ใช้งาน"
                                                renderChevronIcon={(theme, open) => {
                                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                                }}
                                            >
                                                <Sidebar.Item ><i className='fas fa-pen me-2'></i> ฝ่าย</Sidebar.Item>
                                                <Sidebar.Item ><i className='fas fa-pen me-2'></i> แผนก</Sidebar.Item>
                                                <Sidebar.Item ><i className='fas fa-pen me-2'></i> ตำแหน่ง</Sidebar.Item>
                                            </SidebarCollapse>

                                            <Sidebar.Item ><span className='text-xs font-medium'>จองห้องประชุม</span></Sidebar.Item>
                                            <Link to={"/th/home"}><Sidebar.Item><i className='fas fa-calendar me-2'></i>จองห้องประชุม</Sidebar.Item></Link>
                                            <Sidebar.Item ><i className="fa-solid fa-calendar-check me-2"></i>อนุมัติการจอง</Sidebar.Item>
                                            <Sidebar.Item ><i className="fa-solid fa-table me-2"></i>ข้อมูลการจองทั้งหมด</Sidebar.Item>

                                            <Sidebar.Item ><span className='text-xs font-medium'>ห้องประชุม</span></Sidebar.Item>
                                            <Sidebar.Item ><i className="fa-solid fa-vector-square me-2"></i>ข้อมูลห้องประชุม</Sidebar.Item>
                                            <Sidebar.Item ><i className="fa-solid fa-tablet-screen-button me-2"></i>เครื่องมือ</Sidebar.Item>

                                            <Sidebar.Item ><span className='text-xs font-medium'>กิจกรรม</span></Sidebar.Item>
                                            <Sidebar.Item ><i className="fa-solid fa-paper-plane  me-2"></i>โพสต์กิจกรรม</Sidebar.Item>
                                            <Sidebar.Item ><i className="fa-solid fa-gear  me-2"></i>ตั้งค่าเว็บไซต์</Sidebar.Item>


                                        </>
                                    )

                            }
                            <hr />
                            <Sidebar.Item href="#" ><i className='fas fa-sign-out me-2'></i>ออกจากระบบ</Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </React.Fragment>

        )
    }

} 