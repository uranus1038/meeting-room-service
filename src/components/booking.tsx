import { Component, ReactNode, ChangeEvent } from "react";
import axios from "axios";
import { FaChair, FaPen, FaCheck } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import Swal from 'sweetalert2';
//key
import { keyName } from '../../config-web.json';
//components
'use client';

import { HiInformationCircle } from 'react-icons/hi';
import { Modal, Alert, Button, TextInput, Datepicker, ToggleSwitch } from 'flowbite-react';
//interface
import { user } from "../interface/accout";
import { eventFC } from "../interface/calendarEvent";
interface MyState {
    day: string
    switch1: boolean
    error: string
    start_time: string
    end_time: string
    start_date: string
    end_date: string
    number: number
    room: string
    title: string
    note: string
    isApprove: boolean
}
interface MyProps {
    bookingModal: boolean
    onBooking: (newState: boolean) => void;
    dateStr: string;
    data: user;
    getDataBooking: () => Promise<void> ;
}
export class Booking extends Component<MyProps, MyState>
{
    constructor(props: MyProps) {
        super(props);
        this.state = {
            day: "", start_time: "08:00", end_time: "18:00", switch1: true, error: "",
            start_date: this.props.dateStr, end_date: this.props.dateStr, room: "room", title: "", note: "", isApprove: false,
            number: 5
        }
    }
    private OnSubmit: () => void = async () => {
        if (this.props.data.user.toString().length > 0) {
            const token = localStorage.getItem(keyName);
            if (this.state.start_date === "" || this.state.start_date === "") {
                await this.setState({ start_date: this.formatDate(this.props.dateStr, "en") })
                await this.setState({ end_date: this.formatDate(this.props.dateStr, "en") })
            }
            await axios.post("http://localhost:8000/api/user/reserve/", {
                user: this.props.data.user, userName: this.props.data.userName,
                tel: this.props.data.tel, title: this.state.title, start_time: this.state.start_time,
                end_time: this.state.end_time, start_date: this.state.start_date, end_date: this.state.end_date,
                number: this.state.number, room: this.state.room, note: this.state.note, isApprove: this.state.isApprove
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response=>{
                if(response.status === 200)
                {
                    this.props.getDataBooking();
                    this.props.onBooking(false)
                    Swal.fire({
                        title: "การการจองห้องประชุมเสร็จสมบูรณ์",
                        text: "ยินดีด้วย! การจองห้องประชุมของท่านเสร็จสมบูรณ์ หากมีคำถามหรือความต้องการเพิ่มเติม โปรดแจ้งให้เราทราบ",
                        icon: "success",
                        confirmButtonText: "ตกลง",
                    })
                }
            }
            ).catch((error) => {
                if(error.response.status === 409)
                {
                    Swal.fire({
                        title: "Oops! การจองไม่สำเร็จ",
                        text: "ดูเหมือนว่าวันเวลานี้จะถูกจองโดยผู้ใช้งานท่านอื่นไปแล้วสิ น่าเสียดายจริงๆลองเลือกวันเวลาอื่นดูนะ",
                        icon: "error",
                        confirmButtonText: "ตกลง",
                    })
                }
                if (error.response.status === 401) {
                    this.props.onBooking(false)
                    Swal.fire({
                        title: "เซสชั่นหมดอายุ",
                        text: "เซลชั่นของคุณหมดอายุการใช้งานแล้วเพื่อรักษาข้อมูลการใช้งานของคุณเราจึงต้องมีมาตราการในการรักษาความปลอดภัยนี้",
                        icon: "warning",
                        confirmButtonText: "ตกลง",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = window.location.hostname
                        }
                    });
                } else {
                    console.log(error.response.data);
                    this.setState({ error: error.response.data.message });
                    document.getElementById("alertError")?.classList.remove("hidden");
                }

            });

        }
    }

    private setSwitch(isCh: boolean): void {
        if (isCh) {
            this.setState({ start_time: "08:00", end_time: "18:00" })
        }
        this.setState({ switch1: isCh })
    }
    private formatTimeTo24Hours: (time: string) => string = (time) => {
        const timeArray = time.split(':');
        let hours = parseInt(timeArray[0]);
        const minutes = timeArray[1];
        if (hours < 12 && time.includes('PM')) {
            hours += 12;
        }
        else if (hours === 12 && time.includes('AM')) {
            hours = 0;
        }
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    };
    private handleStartTimeChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
        const timeValue: string = event.target.value;
        const formattedTime: string = this.formatTimeTo24Hours(timeValue);
        console.log(formattedTime);

        this.setState({ start_time: formattedTime })
    };
    private handleEndTimeChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
        const timeValue: string = event.target.value;
        const formattedTime: string = this.formatTimeTo24Hours(timeValue);
        this.setState({ end_time: formattedTime })
    };
    private handleNumberChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
        if (event.target.value.toString().length === 0) {
            this.setState({ number: 5 })
        } else {
            this.setState({ number: Number.parseInt(event.target.value) })
        }
    };
    private handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
        this.setState({ title: event.target.value })
    };
    private handleEndDateChange: (event: Date) => void = (event) => {
        this.setState({ start_date: this.formatDate(this.props.dateStr, "en") })
        this.setState({ end_date: this.formatDate(event, "en") })
    };
    private formatDate: (date: string | Date, option: string) => string = (date, language) => {
        let result: string = "0-0-0";
        if (language === "th") {
            const date2: string = new Date(date).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            result = date2;
        } else if (language === "en") {
            const date2: string = new Date(date).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            result = date2;
        }
        return result;

    }
    render(): ReactNode {
        let date: string = this.formatDate(this.props.dateStr, "th");
        return (
            <>
                <Modal theme={{ root: { base: "fixed -top-20 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full" } }} show={this.props.bookingModal} size="2xl" onClose={() => { this.props.onBooking(false) }} popup>
                    <Modal.Header />
                    <Modal.Body >

                        <div className="space-y-6 ">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">เริ่มต้นการจองห้องประชุม</h3>
                            <hr />
                            <Alert className="hidden" id="alertError" color="failure" icon={HiInformationCircle}>
                                {this.state.error}
                            </Alert>
                            <form>
                                <div className="grid gap-6 mb-6 md:grid-cols-3">
                                    <div>
                                        <label htmlFor="" className="text-sm" >วันที่เริ่มต้น</label>
                                        <TextInput theme={{ field: { input: { colors: { gray: "focus:border-gray-500 focus:ring-0" } } } }} id="start_date" type="text" icon={FaCheck} value={date} required readOnly={true} />
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-sm">วันที่สิ้นสุด</label>
                                        <Datepicker onSelectedDateChanged={this.handleEndDateChange} theme={{ popup: { root: { base: " z-20  fixed", }, footer: { button: { today: "text-white hover:bg-indigo-700 focus:ring-0 bg-[#7B66FF]", clear: "focus:ring-2 focus:ring-gray-300" } } } }} language="th" autoHide={false} minDate={new Date(this.props.dateStr)} />
                                    </div>

                                    <div >
                                        <label htmlFor="" className="text-sm">จำนวนที่นั่ง</label>
                                        <TextInput value={this.state.number} onChange={this.handleNumberChange} min={5} max={40} theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} id="email4" type="number" icon={FaChair} placeholder="" required />
                                    </div>
                                    {(this.state.switch1) ?
                                        (<>
                                            <div >
                                                <label htmlFor="" className="text-sm">เวลที่เริ่มต้น</label>
                                                <TextInput theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} onChange={this.handleStartTimeChange} value={this.state.start_time} id="timeInput" type="time" step="60" placeholder="" required disabled />
                                            </div>
                                            <div >
                                                <label htmlFor="" className="text-sm">เวลที่สิ้นสุด</label>
                                                <TextInput theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} onChange={this.handleEndTimeChange} value={this.state.end_time} id="timeInput" type="time" step="60" placeholder="" required disabled />
                                            </div>
                                        </>)
                                        :
                                        (<>  <div >
                                            <label htmlFor="" className="text-sm">เวลที่เริ่มต้น</label>
                                            <TextInput theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} onChange={this.handleStartTimeChange} value={this.state.start_time} id="timeInput" type="time" step="60" placeholder="" required />
                                        </div>
                                            <div >
                                                <label htmlFor="" className="text-sm">เวลที่สิ้นสุด</label>
                                                <TextInput theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} onChange={this.handleEndTimeChange} value={this.state.end_time} id="timeInput" type="time" step="60" placeholder="" required />
                                            </div>
                                        </>)
                                    }

                                    <div className="mt-8">

                                        <ToggleSwitch theme={{ toggle: { base: "toggle-bg rounded-full border group-focus:ring-0", checked: { color: { purple: "bg-[#7B66FF]" } } } }} color="purple" checked={this.state.switch1} onChange={(e) => { this.setSwitch(e) }} label="ตลอดทั้งวัน" />
                                    </div>

                                </div>
                            </form>

                            <div>
                                <label htmlFor="" className="text-sm">หัวข้อ</label>
                                <TextInput value={this.state.title} onChange={this.handleTitleChange} theme={{ field: { input: { colors: { gray: " focus:ring-black focus:border-black" } } } }} id="email4" type="text" icon={FaPen} placeholder="" required />
                            </div>
                            <div>
                                <label htmlFor="" className="text-sm">ห้องประชุม</label>
                                <TextInput theme={{ field: { input: { colors: { gray: "focus:border-gray-500 focus:ring-0" } } } }} type="text" icon={SiGoogleclassroom} value={this.state.room} readOnly={true} />
                            </div>


                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.OnSubmit() }} theme={{ color: { purple: "bg-[#7B66FF] text-white hover:bg-indigo-700" } }} color="purple">จองห้องประชุม</Button>
                        <Button color="gray" onClick={() => { this.props.onBooking(false) }}>
                            ปิด
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}