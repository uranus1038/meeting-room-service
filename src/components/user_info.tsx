import { Component, ReactNode } from 'react';
import Swal from 'sweetalert2';
'use client';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
//key
import { keyName } from '../../config-web.json';
//interface
import { user } from '../interface/accout';
//img
import fallbackImage from '../assets/img/user.png';
//components 
import { Modal } from 'flowbite'
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

            <>
                <div className="flex md:order-2 me-6">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar    alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm w-44">{userName}</span>
                            <span className="block truncate text-sm font-medium">@{user}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>

            </>
        )
    }


} 