import { Component, ReactNode } from 'react';
import Swal from 'sweetalert2';
'use client';
//components 
import { Link } from 'react-router-dom';
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
       // const { user, userName } = this.props.datauser;
        return (

           <></>

        )
    }


} 