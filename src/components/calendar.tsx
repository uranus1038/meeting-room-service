import { Component, ReactNode } from 'react';
// FullCalendarImport Library
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import thLocale from '@fullcalendar/core/locales/th';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
//css
import '../assets/css/main.css'
// props interface 
interface MyProps {
    OnStateChange: (newState: number) => void;
}
class Calendar extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props);


    }
    private handleDateClick: (arg: any) => void = (arg) => {
        this.props.OnStateChange(1) ;

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
            <div className='w-1/2 h-1/2'>
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
                        { title: 'Event 1', start: '2023-12-01', end: '2023-12-05', color: "" },
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
