import { Component, ReactNode } from 'react';
// props interface
interface MyProps {
    OnStateChange(newState: number): void;

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
            department: "",
            section: "",
            role: "",
        };
    }
    private setUser:(events:)=> void = () =>
    {

    }
    render(): ReactNode {
        return (
            <div>
                <div id="creation" className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">

                        <div className="relative ring-2 drop-shadow-lg bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    สร้างบัญชีเข้าใช้งานแพลตฟอร์ม
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
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อในการเข้าสู่ระบบ</label>
                                        <input type="text" name="User" id="User" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="example" required />
                                    </div>
                                    <div className="flex">
                                        <select id="states" className="inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                            <option selected>เพศ</option>
                                            <option value="CA">ชาย</option>
                                            <option value="TX">หญิง</option>
                                        </select>
                                        <input type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ชื่อ-นามาสกุล" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                                        <input type="password" name="password" id="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทร</label>
                                        <input type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xxx-xxxx-xxx" required />
                                    </div>

                                    <div className="flex">
                                        <select id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                            <option selected>ฝ่าย</option>

                                        </select>
                                        <select id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                            <option selected>แผนก</option>

                                        </select>
                                        <select id="states" className="inline-flex items-center w-full py-2.5 px-4 text-sm font-medium  text-gray-500 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                                            <option selected>ตำแหน่ง</option>

                                        </select>

                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        สร้างบัญชีของคุณ</button>
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        คุณมีบัญชีอยู่แล้ว? <button onClick={() => { this.props.OnStateChange(1) }} className="text-blue-700 hover:underline dark:text-blue-500">เข้าสู่ระบบ</button>
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

export default CreationForm;