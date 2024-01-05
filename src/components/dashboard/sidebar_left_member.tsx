import React, { Component, ReactNode } from 'react';
import { Sidebar, Avatar, Badge } from 'flowbite-react';

import { Link } from 'react-router-dom';
//interface user
import { user } from '../../interface/accout';
interface MyProps {
    dataUser: user
    setDataUser(data: user): void;
}
//state
interface MyState {
    eFormState: number
}
export class SidebarLeftMember extends Component<MyProps, MyState> {
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
                    <Sidebar.Items className='mt-5 '>
                        <Sidebar.ItemGroup>

                            <Sidebar.Item ><span className='text-xs font-medium text-purple-500 font-semibold'>รายการ</span></Sidebar.Item>
                            <Link to={"/th/home"}><Sidebar.Item><i className=' fas fa-home me-2'></i><span className="text-sm">หน้าแรก</span></Sidebar.Item></Link>
                            <Link to={"/th/home"}>
                                <Sidebar.Item><i className='fas fa-calendar me-2'></i><span className="text-sm">จองห้องประชุม</span></Sidebar.Item>
                            </Link>
                            <Link to={"/th/home"}>
                                <Sidebar.Item><i className='fa-solid fa-vector-square me-2'></i><span className="text-sm">รายละเอียดห้องประชุม</span></Sidebar.Item>
                            </Link>
                            <Link to={"/th/home"}>
                                <Sidebar.Item><i className="fa-solid fa-clipboard-list me-2"></i><span className="text-sm">รายการของฉัน</span></Sidebar.Item>
                            </Link>
                            <Link to={"/th/home"}>
                                <Sidebar.Item href="#" label="3" ><i className='fas fa-bell me-2'></i><span className="text-sm">การแจ้งเตือน</span></Sidebar.Item>
                            </Link>
                            <hr />
                            <Sidebar.Item href="#" ><i className='fas fa-sign-out me-2'></i>ออกจากระบบ</Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
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