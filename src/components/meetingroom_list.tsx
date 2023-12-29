import { Component, ReactNode } from "react";
// components
'use client';
import { Card, Rating, Avatar, Button, Select, Breadcrumb, Pagination } from 'flowbite-react';
interface MyState {
    currentPage: number ;


}
export class MeetimgListComponent extends Component<{}, MyState> {
    constructor(props: {}) {
        super(props)
        this.state = { currentPage: 1  }
    }
    private setCurrentPage(page: number): void {
        this.setState({ currentPage: page })
    }
    
    render(): ReactNode {
        return (
            <div className="ms-72 p-6 ">
                <h2 className="text-xl font-light  ">ข้อมูลห้องประชุม</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >รายการห้องประชุม</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex items-center justify-end flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    
                    <div className="relative">
                        <Button>เพิ่มห้องประชุม</Button>
                    </div>
                </div>
                <div className=" grid gap-6 mb-6 md:grid-cols-3 my-1">
                    <Card
                        className="max-w-md h hover:drop-shadow-xl hover:z-50"
                        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                        imgSrc="https://picsum.photos/100/50"
                    >
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                            </h5>
                        </a>
                        <div className="mb-5 mt-2.5 flex items-center">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                            </Rating>
                            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                5.0 คะแนน
                            </span>
                        </div>
                        <div className="flex justify-end items-center">
                            <Button.Group>
                                <Button>ดูรายละเอียด</Button>
                                <Button>ลบ</Button>
                            </Button.Group>

                        </div>

                    </Card>
                </div>
            </div>
        )
    }
} 