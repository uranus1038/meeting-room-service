import  { Component, ReactNode }   from 'react';
import React from 'react';
//interface
import { user } from '../interface/accout';
//css
import '../assets/css/main.css'
//img
import fallbackImage from '../assets/img/user.png'; 
// props interface
interface MyProps {
    datauser: user
}
//state 
interface MyState
{
    imageUrl:string
}   
export class UserInfo extends Component<MyProps,MyState> {
    constructor(props: MyProps) {
        super(props);
    }

    render(): ReactNode {
        const {user , userName,tel,department,section,role,member,gender} = this.props.datauser ;
        return (
            <div className="inline-flex">
                <button  id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="relative me-5  text-sm bg-gray-800 rounded-full  " type="button">
                    <span className="sr-only">Open user menu</span>
                    <img 
                    onError={({ currentTarget }) => {
                        currentTarget.src=fallbackImage;
                      }}
                     className="w-9 h-9 rounded-full" src="" alt="user photo"/>
                </button>
                <div id="dropdownAvatar" className="ring-2 absolute top-20 right-8 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg0">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{userName}</div>
                        <div className="font-medium truncate">@{user}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"><i className='fas fa-poll'></i> แดชบอร์ด</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"><i className='fas fa-list'></i> รายการของฉัน</a>
                        </li>
                    </ul>
                    <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><i className='fas fa-sign-out'></i> ออกจากระบบ</a>
                    </div>
                </div>

            </div>
        )
    }


} 