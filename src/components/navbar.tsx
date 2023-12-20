import { Component, ReactNode } from 'react';
import { BrowserRouter as Navigate } from "react-router-dom";
//key //key
import { keyName } from '../../config-web.json';
//interface
import { user } from '../interface/accout';
//component
'use client';
import { UserInfo } from './user_info';
import { Button, Navbar,Badge} from 'flowbite-react';
import { Alert } from './alert';
// props interface
interface MyProps {
    OnFormUser(newState: boolean, newState2: boolean): void;
    dataUser: user
    setDataUser(data: user): void;
}
export class NavbarMain extends Component<MyProps>  {
    constructor(props: MyProps) {
        super(props);
        this.state = { openLogin: false };
    }
    render(): ReactNode {
        return (
            <>
                <Alert />
                <Navbar fluid className='p-3.5 drop-shadow-lg w-full  sticky top-0 z-50' >
                    <Navbar.Brand >
                        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                        <span className="self-center whitespace-nowrap text-xl font-bold text-indigo-950  dark:text-white">Navbar.Brand</span>
                    </Navbar.Brand>

                     <Navbar.Toggle />

                    <Navbar.Collapse >
                        <Button className='focus:!ring-0 h-9 bg-inherit hover:!bg-[#7B66FF] hover:text-white  rounded-full font-bold text-indigo-950'>
                            จองห้องประชุม</Button>
                        <Button className='focus:!ring-0 h-9 bg-inherit hover:!bg-[#7B66FF]  hover:text-white  rounded-full font-bold text-indigo-950'>
                            ห้องประชุม+สถานที่</Button>
                        <Button className='relative  focus:!ring-0 h-9 bg-indigo-200 hover:!bg-[#7B66FF]  hover:text-white  rounded-full font-bold text-indigo-950 group'>
                            กิจกรรม/ข่าวประชาสัมพันธ์   <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  ring-2 ring-white rounded-full px-4 -top-3 -end-4 dark:border-gray-900">ใหม่</div></Button>
                        
                        <Button className='focus:!ring-0  h-9 bg-inherit hover:!bg-[#7B66FF]  hover:text-white  rounded-full font-bold text-indigo-950'>
                            ติดต่อเรา</Button>
                        {
                            (this.props.dataUser.user.length > 0) ? (<UserInfo datauser={this.props.dataUser} setDataUser={this.props.setDataUser} />) :

                                <Button className='focus:!ring-0 h-9  hover:!bg-[#7B66FF] hover:border-[#7B66FF] font-bold text hover:text-white rounded-full bg-inherit border-indigo-950 text-indigo-950' onClick={() => { this.props.OnFormUser(true, false) }}><i className='fas fa-user-circle me-2'></i>สร้างบัญชี / เข้าสู่ระบบ</Button>
                        }
                    </Navbar.Collapse>
                  
                </Navbar>
                
            </>

        );
    }


} 