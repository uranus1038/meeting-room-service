import { Component, ReactNode } from 'react';
//components
import Calendar from './calendar';
// props interface 
interface MyProps {
    OnFormUser(newState: boolean ,newState2:boolean):void;
  }

class Banner extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props)
    }
    render(): ReactNode {
        return (
            <div>
                <div className=' container mx-auto justify-end flex my-5'>
                    <Calendar OnFormUser={this.props.OnFormUser} />
                </div>

            </div>
        )
    }

}

export default Banner;