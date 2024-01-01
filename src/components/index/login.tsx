import { Component, ReactNode, ChangeEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
//component 
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
// key name
import { keyName } from '../../../config-web.json'
//interface
import { user } from '../../interface/accout';
/// props interface
interface MyProps {
    OnFormUser(newState: boolean, newState2: boolean): void;
    LoginModal: boolean
    setDataUser(data: user): void;
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
            if (response.status === 200) {
                localStorage.setItem(keyName, response.data.token)
                console.log(response.data.user);
                this.props.OnFormUser(false,false);
                this.props.setDataUser(response.data.user);
                Swal.fire({
                    title: "เข้าสู่ระบบสำเร็จ",
                    text: "เริ่มต้นใช้งานแพลตฟอร์มของเราได้ทันที.",
                    icon: "success",
                    confirmButtonText: "ตกลง",
                });
            }
        }).catch((err) => {
            const message: string = err.response.data.message;
            this.setState({ error: message })
            document.getElementById("alertError")?.classList.remove("hidden");
        })
    }
    render(): ReactNode {
        return (
            <div>
                <Modal show={this.props.LoginModal} size="md" onClose={() => { this.props.OnFormUser(false, false) }} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">ลงชื่อเข้าใช้แพลตฟอร์มของเรา</h3>
                           <hr />
                            <form className="space-y-4" action="#">
                                <div id="alertError" className="hidden flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {this.state.error}
                                    </div>
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
                                <button onClick={() => { this.OnSubmit() }} type="button" className="w-full text-white bg-[#7B66FF] hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    เข้าสู่ระบบโดยใช้บัญชีของคุณ</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    คุณยังไม่มีบัญชีใช่หรือไม่? <button onClick={() => {this.props.OnFormUser(false,true)}} className="text-blue-700 hover:underline dark:text-blue-500">สร้างบัญชี</button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }

}

export default LoginForm;