import { Component, ReactNode } from 'react';
import axios from 'axios';
import { BrowserRouter as Navigate } from "react-router-dom";
import Banner from '../components/banner';
// components
import LoginForm from '../components/login_form';
import { Navbar } from '../components/navbar';
import CreationForm from '../components/creation';
//state
interface MyState{
  eFormState:number
}
export class Index extends Component<{}, MyState> {
  constructor(props: {}) {
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
        <Navbar OnStateChange={this.setStateForm} />
        <Banner OnStateChange={this.setStateForm} />
        {(eFormState !== 1 && eFormState !== 2)? (<p></p>) : ((eFormState === 2) ? 
        (<CreationForm OnStateChange={this.setStateForm}/>):(<LoginForm OnStateChange={this.setStateForm}/>))}
      </>

    )
  }

} 