import { Component, ReactNode } from 'react';
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
//css
import '../assets/css/main.css'
// props interface 
interface MyProps {
    OnFormUser: (newState: boolean, newState2: boolean) => void;
}
class Calendar extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props);


    }
    private handleDateClick: (arg: any) => void = (arg) => {
        this.props.OnFormUser(true, false);

        const dateString = '2023-01-15'; // 15 มกราคม 2023
        // เปรียบเทียบว่าวันที่ใน string เทียบกับวันนี้หรือไม่
        const currentDate = new Date().getTime();

        // ใช้ toLocaleTimeString()
        // const formattedTime = currentDate.toLocaleTimeString('en-US', {
        //   hour12: false,
        // });

        // alert('Current Time (String):'+currentDate);


    };
    render(): ReactNode {
        return (
            <div className='w-1/2 h-1/2 '>
                    <Button.Group className='my-1'>
                        <Button className='font-bold text-indigo-950' color="gray"><i className='fas fa-search me-2'></i> ค้นหาห้อง</Button>
                        <Button className='font-bold text-indigo-950' color="gray"><i className='fas fa-list me-2'></i> รายการของฉัน</Button>
                        <Button className='font-bold text-indigo-950' color="gray"><i className='fas fa-info-circle me-2'></i> รายละเอียดห้อง</Button>
                    </Button.Group>
                <Select  className='my-1 font-bold text-indigo-950 ' id="countries" required>
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
                    events={[
                        { title: 'Event 1', start: '2023-12-01', end: '2023-12-05', color: "#5FBDFF" },
                        { title: 'Event 1', start: '2023-12-01', end: '2023-12-01', color: "" },
                        { title: 'Event 1', start: '2023-12-01T10:30:00', end: '2023-12-03T10:35:00', color: "" },
                    ]}
                    dayMaxEvents={1}

                    dateClick={this.handleDateClick}
                />
            </div>

        );


    }
}

export default Calendar;
