import { Component, ReactNode } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
'use client';
//components 
import { Avatar, Dropdown } from 'flowbite-react';
//key
import { keyName } from '../../config-web.json';
//interface
import { user } from '../interface/accout';
//img
import fallbackImage from '../assets/img/user.png';
import type { ModalOptions, ModalInterface } from 'flowbite'

// props interface
interface MyProps {
    datauser: user
    setDataUser(data: user): void;
}
//state 
interface MyState {
    imageUrl: string
}
export class UserInfo extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
    }

    render(): ReactNode {
        const { user, userName } = this.props.datauser;
        return (

            <div className="flex md:order-1">


                <Dropdown className='w-44 ms-16'
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" size={"md"} status='online' rounded />
                    }
                >
                    <Link to={"/th/dashboard"}>
                        <Dropdown.Item className='font-bold items-center hover:!bg-gray-200'><i className='text-center fas fa-user me-2'></i> โปรไฟล์</Dropdown.Item>
                    </Link>
                    <Dropdown.Item className='font-bold items-center hover:!bg-gray-200'><i className='text-lg fas fa-sign-out me-2'></i> ออกจากระบบ</Dropdown.Item>
                </Dropdown>
                <div className="ms-2 font-medium dark:text-white">
                    <div>{userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@{user}</div>
                </div>
           
         
            </div>

        )
    }


} 