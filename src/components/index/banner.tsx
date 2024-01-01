import { Component, ReactNode } from 'react';
//components
import Calendar from '../calendar/calendar';
//interface
import { user } from '../../interface/accout';
// props interface 
interface MyProps {
    OnFormUser(newState: boolean, newState2: boolean): void;
    data:user
}
//state
interface MyState
{
    wideResponsive :string
}
class Banner extends Component<MyProps ,MyState> {
    constructor(props: MyProps) {
        super(props)
        this.state ={wideResponsive:"w-1/2 h-1/2"}
    }
    render(): ReactNode {
        return (
            <div>

                <div className=' container justify-end flex   my-8' style={{ zIndex: -1 }}>
                   <div className='w-1/2 h-1/2'>

                    <Calendar OnFormUser={this.props.OnFormUser} data={this.props.data}/>
                   </div>
                </div>

            </div>
        )
    }

}

export default Banner;