import { Component, ReactNode } from 'react';
import axios from 'axios';
import Banner from '../components/banner';
//import interface
import {user} from '../interface/accout';
// components
import { SidebarLeft } from '../components/sidebar_left';
interface MyProps{
  dataUser:user
  setDataUser(data:user):void;
}
//state
interface MyState {
  eFormState: number
}
export class Dashboard extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      eFormState: 0,
    };
  }

  render(): ReactNode {
    return (
      <>
      <SidebarLeft dataUser={this.props.dataUser} setDataUser={this.props.setDataUser}/>
      </>
    )
  }

} 