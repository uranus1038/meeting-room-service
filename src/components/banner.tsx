import { Component, ReactNode } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
//components
import Calendar from './calendar';


class Banner extends Component {
    render(): ReactNode {
        return (
            <div>
                <div className=' container mx-auto justify-end flex my-5'>
                    <Calendar />
                </div>
                
            </div>
        )
    }
    
}

export default Banner;