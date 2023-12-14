import { Component, ReactNode } from 'react';
import axios from 'axios';
import Banner from '../components/banner';
// components

//state
interface MyState{
  eFormState:number
}
export class Dashboad extends Component<{}, MyState> {
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
        
      </>

    )
  }

} 