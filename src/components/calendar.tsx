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
class Calendar extends Component {
    private handleDateClick():void{
       // alert(arg.dateStr);
    };
 
    render(): ReactNode  {
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
                        { title: 'Event 1', start: '2023-12-01', end: '2023-12-01', color: "    " },
                        { title: 'Event 1', start: '2023-12-01T10:30:00', color: "#2ecc71" },
                    ]}
                    dayMaxEvents={1}

                    dateClick={this.handleDateClick}
                />
            </div>

        );
       
       
    }
}

export default Calendar;
