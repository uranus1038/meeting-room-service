import { Component, ReactNode } from 'react';
//components
import Calendar from './calendar';
// props interface 
interface MyProps {
    OnStateChange(newState: number):void;
  }

class Banner extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props)
    }
    render(): ReactNode {
        return (
            <div>
                <div className=' container mx-auto justify-end flex my-5'>
                    <Calendar OnStateChange={this.props.OnStateChange} />
                </div>

            </div>
        )
    }

}

export default Banner;