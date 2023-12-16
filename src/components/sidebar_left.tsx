import React, { Component, ReactNode } from 'react';
import { Sidebar, Avatar ,  SidebarCollapse } from 'flowbite-react';
import {

    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiUserGroup
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
//state
interface MyState {
    eFormState: number
}
export class SidebarLeft extends Component<{}, MyState> {
    constructor(props: {}) {
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
                            <Link to={"/th/home"}>
                                <Sidebar.Item >
                                    <i className='fas fa-home me-2'></i>
                                    หน้าแรก
                                </Sidebar.Item>
                            </Link>

                            <Sidebar.Item href="#"  >
                                <i className='fas fa-calendar me-2'></i>
                                จองห้องประชุม
                            </Sidebar.Item>
                            <Sidebar.Item href="#">
                                <i className='fas fa-list me-2' ></i>
                                รายการของฉัน
                            </Sidebar.Item>
                            <Sidebar.Item href="#" label="PRO" labelColor="red">
                                <i className='fa-brands fa-line me-2'></i>

                                การแจ้งเตือนผ่านไลน์
                            </Sidebar.Item>
                            <Sidebar.Item href="#" label="3" >
                                <i className='fas fa-bell me-2'></i>

                                การแจ้งเตือน
                            </Sidebar.Item>
                            <Sidebar.Item href="#"><i className='fas fa-user me-2'></i>จัดการสมาชิก</Sidebar.Item>
                            <Sidebar.Item href="#"><i className="fa-solid fa-address-book me-2"></i>บทบาทและหน้าที่</Sidebar.Item>
                            <SidebarCollapse
                            theme={{icon:{base:"h-5 w-5 mb-1 ms-3"}}}
                               icon={HiUserGroup}
                                label="ผู้ใช้งาน"
                                renderChevronIcon={(theme, open) => {
                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                }}
                            >
                                <Sidebar.Item href="#"><i className='fas fa-pen me-2'></i> ฝ่าย</Sidebar.Item>
                                <Sidebar.Item href="#"><i className='fas fa-pen me-2'></i> แผนก</Sidebar.Item>
                                <Sidebar.Item href="#"><i className='fas fa-pen me-2'></i> ตำแหน่ง</Sidebar.Item>
                            </SidebarCollapse>
                            <Sidebar.Item href="#">ข้อมูลการจองทั้งหมด</Sidebar.Item>
                            <Sidebar.Item href="#">อนุมัติการจอง</Sidebar.Item>
                            <Sidebar.Item href="#">ข้อมูลห้องประชุม</Sidebar.Item>

                            <hr />
                            <Sidebar.Item href="#" >
                                <i className='fas fa-sign-out me-2'></i>

                                ออกจากระบบ
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </React.Fragment>

        )
    }

} 