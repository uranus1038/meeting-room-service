import { Component, ReactNode } from "react";

export class Alert extends Component {
    render(): ReactNode {
        return(
        <>
            <div className="bg-[#7B66FF] text-center py-2 lg:px-2">
                <div className="p-1 bg-indigo-600 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">ใหม่</span>
                    <span className="font-medium mr-2 text-left text-white text-sm flex-auto">ระบบจองห้องประชุมออนไลน์ ในรูปแบบเว็บไซต์สำเร็จรูป รองรับการจองห้องประชุมได้ตลอด 24 ชั่วโมง</span>
                    {/*     <svg className="fill-current opacity-75 h-4 w-4 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg> */}
                </div>
            </div>
        </>
        )
    }
}