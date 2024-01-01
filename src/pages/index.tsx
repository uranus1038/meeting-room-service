import { Component, ReactNode } from 'react';
import axios from 'axios';
import { BrowserRouter as Navigate } from "react-router-dom";
import Banner from '../components/index/banner';
// components
import LoginForm from '../components/index/login';
import { NavbarMain } from '../components/navbar/navbar';
import CreationForm from '../components/index/creation';
//interface
import {user} from '../interface/accout';
//state
interface MyState{
  isLoginForm:boolean 
  isCreation:boolean
}
interface MyProps{
  dataUser:user
  setDataUser(data:user):void;
}
export class Index extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      isLoginForm: false,
      isCreation : false,
    };
  }
  private setForm:(newState: boolean , newState2:boolean) => void =  (newState,newState2)=>
  {
       this.setState({isLoginForm : newState , isCreation:newState2});
  }
  render(): ReactNode {
    return (
      <>
        <NavbarMain OnFormUser={this.setForm} dataUser={this.props.dataUser} setDataUser={this.props.setDataUser}/>
        <Banner OnFormUser={this.setForm} data={this.props.dataUser}/>
        <LoginForm setDataUser={this.props.setDataUser} LoginModal={this.state.isLoginForm} OnFormUser={this.setForm}/>
        <CreationForm OnFormUser={this.setForm} CreationModal={this.state.isCreation}/>
      </>

    )
  }

} 