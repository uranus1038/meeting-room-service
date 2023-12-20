import { Component, ReactNode,ChangeEvent } from "react";
import { FaChair } from 'react-icons/fa';

//components
import { Modal, Label, TextInput, Datepicker } from 'flowbite-react';
//interface
import { user } from "../interface/accout";
interface MyState {
    day:string 
}
interface MyProps {
    bookingModal: boolean
    onBooking: (newState: boolean) => void;
    dateStr: string
}
export class Booking extends Component<MyProps, MyState>
{
    constructor(props: MyProps) {
        super(props);
    }
    private setDay(events:any):void
    {
        this.setState({day:events.target.value})
        console.log(events);
        
    }
    render(): ReactNode {
        let date:string = new Date(this.props.dateStr).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return (
            <>
                <Modal theme={{root:{base:"fixed -top-20 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"}}}  show={this.props.bookingModal} size="2xl" onClose={() => { this.props.onBooking(false) }} popup>
                    <Modal.Header  />
                    <Modal.Body >
                        <div className="space-y-6 ">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">เริ่มต้นการจองห้องประชุม</h3>
                            <hr />

                            <form>
                                <div className="grid gap-6 mb-6 md:grid-cols-3">
                                    <div>
                                        <label htmlFor="" className="text-sm" >วันที่เริ่มต้น</label>

                                        <Datepicker theme={{popup:{root:{base:" z-20  fixed"}}}}  language="th" value={date}   readOnly={true} />
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-sm">วันที่สิ้นสุด</label>
                                        <Datepicker  language="th" autoHide={false}  minDate={new Date(this.props.dateStr)} />
                                    </div>

                                    <div>
                                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div>
                                        <Datepicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 3, 30)} />
                                    </div>
                                   




                                </div>
                            </form>

                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}