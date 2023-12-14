import  { Component, ReactNode }   from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
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
    private openDropdown() : void{
       // const screenWidth = window.innerWidth;
        const dropdown = document.getElementById("dropdownAvatar");
        dropdown?.classList.toggle("hidden");
     
    }

    render(): ReactNode {
        const {user , userName} = this.props.datauser ;
        return (
            <div className="inline-flex">
                <button onClick={()=>{this.openDropdown()}} id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" className="relative me-5 w-9 h-9 text-sm bg-gray-800 rounded-full  " type="button">
                    <span className="sr-only">Open user menu</span>
                    <img 
                    onError={({ currentTarget }) => {
                        currentTarget.src=fallbackImage;
                      }}
                     className=" rounded-full w-max" src="" alt="user photo"/>
                </button>
                <div id="dropdownAvatar" className="ring-2 absolute top-20 right-12 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg0">
                    <div className="px-4 font-medium py-3 text-sm text-gray-900 dark:text-white">
                        <div>{userName}</div>
                        <div className="font-medium truncate">@{user}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <Link to={"/th/dashboard"}>
                            <a  className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">แดชบอร์ด</a>
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">รายการของฉัน</a>
                        </li>
                    </ul>
                    <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">ออกจากระบบ</a>
                    </div>
                </div>

            </div>
        )
    }


} 