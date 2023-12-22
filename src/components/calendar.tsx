import { Component, ReactNode } from 'react';
import axios from 'axios';
// FullCalendarImport Library
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import thLocale from '@fullcalendar/core/locales/th';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
//components
'use client';
import { Button, Select } from 'flowbite-react';
import { Booking } from './booking';
//css
import '../assets/css/main.css'
// interface
import { user } from '../interface/accout';
import { reserve } from '../interface/reserve';
import { eventFC } from '../interface/calendarEvent';
// props interface 
interface MyProps {
    OnFormUser: (newState: boolean, newState2: boolean) => void;
    data: user

}
// state
interface MyState {
    isBookingModal: boolean
    dateStr: string
    events: eventFC
}
class Calendar extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = { isBookingModal: false, dateStr: "", events: { title: "", start: "", end: "", color: "",eventDisplay:"" } };
    }
    componentDidMount() {
        this.getDataBooking();
    }
    private getDataBooking: () => Promise<void> = async () => {
        await axios.get("http://localhost:8000/api/calendar/booking/room").then(response => {

            if (response.data.booking.length > 0) {
                const updatedEvents: eventFC = response.data.booking.map((result: reserve) => {
                    let color = "";
                    let eventDisplay = "list-item"
                    if (!result.isApprove) {
                        color = "#FBBF24";
                    } else if (result.isApprove && result.start_time === "08:00" && result.end_time === "18:00") {
                        color = "#7B66FF";

                    } else {
                        if (result.isApprove) {
                            color = "#3B82F6";
                        }
                    }
                    const data: eventFC = {
                        title: `${result.start_time}-${result.end_time} ${result.title}`,
                        start: `${result.start_date}`,
                        end: `${result.end_date}T${result.end_time}:00`,
                        color,
                        eventDisplay
                    }
                    return data;
                }
                );

                this.setState({ events: updatedEvents});
            }

        }).catch((error) => {
            // reload data calendar
        })
    }
    private setBooking: (newState: boolean) => void = (newState) => {
        this.setState({ isBookingModal: newState });
    }
    private handleDateClick: (arg: any) => void = (arg) => {
        if (this.props.data.user.length > 0) {
            const currentDate: Date = new Date();
            const eventDate: Date = new Date(arg.dateStr);
            var targetTime: Date = new Date();
            targetTime.setHours(18, 0, 0, 0);
            if (currentDate > eventDate && currentDate.getDate() !== eventDate.getDate()) {
                alert("ขออภัย, ไม่สามารถทำการจองย้อนหลังได้ กรุณาตรวจสอบเงื่อนไขการใช้งาน");
            } else {
                if (currentDate.getTime() < targetTime.getTime()) {
                    this.setState({ isBookingModal: true });
                    this.setState({ dateStr: arg.dateStr });
                } else {
                    if (currentDate.getDate() !== eventDate.getDate()) {
                        this.setState({ isBookingModal: true });
                        this.setState({ dateStr: arg.dateStr });
                    } else {
                        alert("ขออภัย, ไม่สามารถทำการจองย้อนหลังได้เนื่องจากเลยเวลาที่กำหนดไว้แล้ว");
                    }
                }

            }
        } else {
            this.props.OnFormUser(true, false);
        }
    };
    private handleEventClick = (info:any) => {
       alert(info.event.info)
      };
    private handleEventMouseEnter = (info:any) => {
    
        // แสดง tooltip ด้วย alt attribute
        info.el.setAttribute('title', info.event.title);
      };
    
      private handleEventMouseLeave = (info:any) => {
        // ลบ alt attribute เมื่อ mouse leave
        info.el.removeAttribute('title');
      };
    render(): ReactNode {
        return (
            <div className='w-1/2 h-1/2 '>
                <Button.Group className='my-1'>
                    <Button className=' text-indigo-950' color="gray"><i className='fas fa-search me-2'></i> ค้นหาห้องประชุม</Button>
                    <Button className=' text-indigo-950' color="gray">
                        <i className='fas text-[#FBBF24]  fa-square me-2'></i> รออนุมัติ
                        <i className='fas fa-square ms-2 me-2 text-[#3B82F6]'></i>อนุมัติแล้ว
                        <i className='fas fa-square ms-2 me-2 text-[#7B66FF]'></i>ตลอดทั้งวัน
                    </Button>
                </Button.Group>
                <Select className='my-1  text-indigo-950 ' id="countries" required>
                    <option >ห้องประชุม</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                </Select>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }}
                    views={{
                        dayGridMonth: { buttonText: 'Month' },
                        timeGridWeek: { buttonText: 'Week' },
                        timeGridDay: { buttonText: 'Day' },
                        listWeek: { buttonText: 'List Week' },
                    }}
                    locale={thLocale}
                    showNonCurrentDates={false}
                    events={this.state.events}
                    dayMaxEvents={1}
                    dateClick={this.handleDateClick}
                    eventOverlap={false}
                    eventClick={this.handleEventClick}
                    eventMouseEnter={this.handleEventMouseEnter}
                    eventMouseLeave={this.handleEventMouseLeave}
                    displayEventTime={false}

                />
                <Booking getDataBooking={this.getDataBooking} data={this.props.data} bookingModal={this.state.isBookingModal} onBooking={this.setBooking} dateStr={this.state.dateStr} />
            </div>

        );


    }
}

export default Calendar;
