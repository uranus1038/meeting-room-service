import { Component, ReactNode } from 'react';
import { BrowserRouter as Navigate } from "react-router-dom";
import Banner from '../components/banner';
// components
import LoginForm from '../components/login_form';
import { Navbar } from '../components/navbar';
export class Index extends Component {
  render(): ReactNode {
    return (
      <>
        <Navbar />
        <Banner />

      </>

    )
  }

} 