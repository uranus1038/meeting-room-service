import React, { Component, ReactNode } from "react";
'use client';
//components
import { Button, ButtonGroup, Navbar } from 'flowbite-react';
export class Navbar2 extends Component {
    render(): ReactNode {
        return (

            <Navbar fluid className="p-3.5 drop-shadow-lg w-full  sticky top-0 z-10">
                <Navbar.Brand >
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    
                    <Navbar.Link href="#">
                    <ButtonGroup>
                            <Button>ค้นหา</Button>
                            <Button>แสกน qr</Button>
                    </ButtonGroup>
                    </Navbar.Link>

                </Navbar.Collapse >
                
            </Navbar >

        )
    }
}