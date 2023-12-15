import { Component, ReactNode, ChangeEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
//components
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
// props interface
interface MyProps {
    OnFormUser(newState: boolean, newState2: boolean): void;
    CreationModal: boolean
}
interface MyState {
    user: string
    gender: string
    userName: string
    passWord: string
    tel: number
    department: string
    section: string
    role: string
    error: string
}
class CreationForm extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            user: "",
            gender: "",
            userName: "",
            passWord: "",
            tel: 0,
            department: "---",
            section: "---",
            role: "---",
            error: ""
        };
    }
    private OnSubmit: () => Promise<void> = async () => {

        await axios.post("http://localhost:8000/api/user/creation/", {
            user: this.state.user,
            userName: this.state.userName,
            passWord: this.state.passWord,
            tel: this.state.tel,
            gender: this.state.gender,
            department: this.state.department,
            section: this.state.section,
            role: this.state.role
        }).then((response) => {
            if (response.status === 200) {
                this.props.OnFormUser(false,false);
                Swal.fire({
                    title: "การสมัครใช้งานสำเร็จ",
                    text: "ขอบคุณที่เข้าร่วม! คุณสามารถเข้าสู่ระบบได้ทันที.",
                    icon: "success",
                    confirmButtonText: "เข้าสู่ระบบ",
                    cancelButtonText: "ปิด",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.props.OnFormUser(true,false);
                    }
                });
            }
        }).catch((err) => {
            const message: string = err.response.data.message
            this.setState({ error: message });
            document.getElementById("alertError")?.classList.remove("hidden");

        })
    }
    private setUser: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ user: events.target.value });
    }
    private setGender: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ gender: events.target.value });
    }
    private setUserName: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ userName: events.target.value });
    }
    private setPassWord: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ passWord: events.target.value });
    }
    private setTel: (events: ChangeEvent<HTMLInputElement>) => Promise<void> = async (events) => {
        await this.setState({ tel: Number.parseInt(events.target.value) });
    }
    private setDepartment: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ department: events.target.value });
    }
    private setSection: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ section: events.target.value });
    }
    private setRole: (events: ChangeEvent<HTMLSelectElement>) => Promise<void> = async (events) => {
        await this.setState({ role: events.target.value });
    }

    render(): ReactNode {
        return (
            <div>
                <Modal show={this.props.CreationModal} size="md" onClose={() => { this.props.OnFormUser(false, false) }} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">สร้างบัญชีเข้าใช้งานแพลตฟอร์ม</h3>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อในการเข้าสู่ระบบ</label>
                                    <input onChange={this.setUser} type="text" name="User" id="User" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example" required />
                                </div>
                                <div className="flex">
                                    <select onChange={this.setGender} id="states" className="inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" >
                                        <option selected>เพศ</option>
                                        <option value="male">ชาย</option>
                                        <option value="female">หญิง</option>
                                    </select>
                                    <input onChange={this.setUserName} type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อ-นามาสกุล" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                                    <input onChange={this.setPassWord} type="password" name="password" id="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทร</label>
                                    <input onChange={this.setTel} type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxx-xxxx-xxx" required />
                                </div>

                                <div className="flex">
                                    <select onChange={this.setDepartment} id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                        <option selected>ฝ่าย</option>

                                    </select>
                                    <select onChange={this.setSection} id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                        <option selected>---</option>

                                    </select>
                                    <select onChange={this.setRole} id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                        <option selected>---</option>

                                    </select>

                                </div>
                                <button onClick={() => { this.OnSubmit() }} type="button" className="w-full text-white bg-[#7B66FF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    สร้างบัญชีของคุณ</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    คุณมีบัญชีอยู่แล้ว? <button onClick={() => {  this.props.OnFormUser(true, false)}} className="text-blue-700 hover:underline dark:text-blue-500">เข้าสู่ระบบ</button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default CreationForm;