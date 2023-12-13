import { Component, ReactNode, ChangeEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2' ;
// key name
import {keyName} from '../../config-web.json'
//interface
import { user } from '../interface/accout';
/// props interface
interface MyProps {
    OnStateChange(newState: number): void;
}
interface MyState {
    user: string,
    passWord: string,
    error: string
}
class LoginForm extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props)
        this.state = {
            user: "",
            passWord: "",
            error: ""
        }
    }
    private setUser: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ user: events.target.value });
    }
    private setPassWord: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ passWord: events.target.value });
    }
    private OnSubmit: () => Promise<void> = async () => {
        await axios.post("http://localhost:8000/api/user/login/", {
            user: this.state.user,
            passWord: this.state.passWord
        }).then((response) => {
            if(response.status === 200)
            {
                localStorage.setItem(keyName,response.data.token)
                this.props.OnStateChange(0) ;
                console.log(response.data.user);
                
                Swal.fire({
                    title: "เข้าสู่ระบบสำเร็จ",
                    text: "เริ่มต้นใช้งานแพลตฟอร์มของเราได้ทันที.",
                    icon: "success",
                    confirmButtonText: "ตกลง",
                  });
            }
        }).catch((err) => {
            if(err.response.status === 400)
            {
                const message:string = err.response.data.message ; 
                this.setState({error:message} )
                document.getElementById("alertError")?.classList.remove("hidden");
            }
        })
    }
    render(): ReactNode {
        return (
            <div>
                <div id="login" className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">

                        <div className="relative ring-2 drop-shadow-lg bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    ลงชื่อเข้าใช้แพลตฟอร์มของเรา
                                </h3>
                                <button onClick={() => { this.props.OnStateChange(0) }} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                <div id='alertError' className="hidden p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {this.state.error}
                                </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อผู้เข้าใช้งาน</label>
                                        <input onChange={this.setUser} type="text" name="user" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                                        <input onChange={this.setPassWord} type="password" name="password" id="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                            </div>
                                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">จดจำฉันในระบบ</label>
                                        </div>
                                        {/* <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a> */}
                                    </div>
                                    <button onClick={() => { this.OnSubmit() }} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        เข้าสู่ระบบโดยใช้บัญชีของคุณ</button>
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        คุณยังไม่มีบัญชีใช่หรือไม่? <button onClick={() => { this.props.OnStateChange(2) }} className="text-blue-700 hover:underline dark:text-blue-500">สร้างบัญชี</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default LoginForm;