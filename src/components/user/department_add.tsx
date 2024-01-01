import { Breadcrumb, Select, Button, Textarea, Label, ButtonGroup } from "flowbite-react";
import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//cofig key
import { keyName } from '../../../config-web.json'

//components
import { FaInfo } from 'react-icons/fa';
import { Alert } from 'flowbite-react';
//interface
import { user } from "../../interface/accout";
import { position } from "../../interface/position";
interface MyProps {
    undo: (newState: number) => void;
}
interface MyState {
    error: string

}
export class AddDepartment extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            error: "",
        };
    }
    private setAnimationAlert(state: Number): void {
        switch (state) {
            case 0:
                document.getElementById("alertInfo")?.classList.add("hidden");
                break;
            case 1:
                document.getElementById("alertInfo")?.classList.remove("hidden");
                break;
        }
    }
    private isAlert(): void {

    }
    render(): ReactNode {
        return (
            <>
                <h2 className="text-xl font-light">จัดการสมาชิก</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายชื่อสมาชิก</Breadcrumb.Item>
                    <Breadcrumb.Item >อัปเดตข้อมูลสมาชิก</Breadcrumb.Item>
                </Breadcrumb>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสฝ่าย</label>
                        <input type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อฝ่าย</label>
                        <input type="number" name="tel" id="tel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมายเหตุ</label>
                        <textarea id="note" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => { this.props.undo(0) }}>ย้อนกลับ</Button>
                            <Button>เพิ่มฝ่าย</Button>
                        </ButtonGroup>


                    </div>
                    <Alert id="alertInfo" className="animationInfoUser w-full hidden sticky bottom-6" additionalContent={
                        <>
                            <div className="flex justify-between items-center">
                                <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
                                    <FaInfo className="me-3 inline-flex" /> ข้อมูลมีการเปลี่ยนแปลง คุณต้องการแก้ไขหรือไม่ ?
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                                    >
                                        อัปเดต
                                    </button>
                                    <button

                                        type="button"
                                        className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
                                    >
                                        ยกเลิก
                                    </button>
                                </div>

                            </div>
                        </>
                    } color="warning" >
                    </Alert>



                </form>

            </>
        )
    }
}