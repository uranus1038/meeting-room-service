import { Component, ReactNode } from 'react';
import axios from 'axios';
//import interface
import { user } from '../interface/accout';
// components
import Calendar from '../components/calendar/calendar';
import { SidebarLeftAdmin } from '../components/dashboard/sidebar_left_admin';
import { SidebarLeftMember } from '../components/dashboard/sidebar_left_member';
import { DashboardComponent } from '../components/dashboard/dashboard';
import { Navbar2 } from '../components/navbar/navbar2';
import { MemberList } from '../components/member_management/member_list';
import { RoleLsit } from '../components/role/role_list';
import { DepartmentComponent } from '../components/user/department_list';
import { SectionComponent } from '../components/user/section_list';
import { PositionComponent } from '../components/user/position_list';
import { ApproveComponent } from '../components/meeting_room/approve_list';
import { BookingComponent } from '../components/meeting_room/booking_list';
import { MeetimgListComponent } from '../components//meeting_room/meetingroom_list';
import { ToolComponent } from '../components/services/tools';
import { ServiceComponent } from '../components/services/services';
interface MyProps {
  dataUser: user
  setDataUser(data: user): void;
  linkState: number
  newLink: (newState: number) => void;
}
//state
interface MyState {
  eFormState: number
  isLoginForm: boolean
  isCreation: boolean
}
export class Dashboard extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      eFormState: 0,
      isLoginForm: false,
      isCreation: false,
    };
  }

  componentDidMount() {
    //this.props.newLink(0);
  }


  private setForm: (newState: boolean, newState2: boolean) => void = (newState, newState2) => {
    this.setState({ isLoginForm: newState, isCreation: newState2 });
  }
  render(): ReactNode {
    return (
      <>
        {(this.props.dataUser.member !== "member") ? (
          <><SidebarLeftAdmin newLink={this.props.newLink} dataUser={this.props.dataUser} setDataUser={this.props.setDataUser} /></>) :
          (<><SidebarLeftMember dataUser={this.props.dataUser} setDataUser={this.props.setDataUser} /></>)}
        <Navbar2 />
        {(this.props.linkState === 0) ?
          (<DashboardComponent />) : null
        }
        {(this.props.linkState === 1) ?
          (<MemberList />) : null
        }
        {(this.props.linkState === 2) ?
          (<RoleLsit />) : null
        }
        {(this.props.linkState === 3) ?
          (<DepartmentComponent />) : null
        }
        {(this.props.linkState === 4) ?
          (<SectionComponent />) : null
        }
        {(this.props.linkState === 5) ?
          (<PositionComponent />) : null
        }
        {(this.props.linkState === 6) ?
          (<div className='ms-72 pt-6 pe-20 ps-20 pb-6'>

            <Calendar OnFormUser={this.setForm} data={this.props.dataUser} />
          </div>) : null
        }
        {(this.props.linkState === 7) ?
          (<ApproveComponent />) : null
        }
        {(this.props.linkState === 8) ?
          (<BookingComponent />) : null
        }
        {(this.props.linkState === 9) ?
          (<MeetimgListComponent />) : null
        }
        {(this.props.linkState === 10) ?
          (<ToolComponent />) : null
        }
        {(this.props.linkState === 11) ?
          (<ServiceComponent />) : null
        }
      </>
    )
  }

} 