import { Component, ReactNode } from 'react';
import axios from 'axios';
import { BrowserRouter as Navigate } from "react-router-dom";
import Banner from '../components/banner';
// components
import LoginForm from '../components/login';
import { Navbar } from '../components/navbar';
import CreationForm from '../components/creation';
//interface
import {user} from '../interface/accout';
//state
interface MyState{
  eFormState:number
}
interface MyProps{
  dataUser:user
  setDataUser(data:user):void;
}
export class Index extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      eFormState: 0,
    };
  }
  private setStateForm:(newState: number) => void =  (newState)=>
  {
       this.setState({eFormState : newState});
  }

  render(): ReactNode {
    const {eFormState} = this.state ;
    return (
      <>
        <Navbar OnStateChange={this.setStateForm} dataUser={this.props.dataUser}/>
        <Banner OnStateChange={this.setStateForm} />
        {(eFormState !== 1 && eFormState !== 2)? (<p></p>) : ((eFormState === 2) ? 
        (<CreationForm OnStateChange={this.setStateForm}/>):(<LoginForm OnStateChange={this.setStateForm} setDataUser={this.props.setDataUser}/>))}
      </>

    )
  }

} 