import { Component, ReactNode } from "react";
import { HiInformationCircle } from 'react-icons/hi';
import { Card, Breadcrumb, Button } from 'flowbite-react';

export class DashboardComponent extends Component {
    render(): ReactNode {
        return (
            <div className="ms-72 p-6">

                <h2 className="text-xl font-light">แดชบอร์ด</h2>
                <Breadcrumb className="mt-2 " aria-label="Default breadcrumb example ">
                    <Breadcrumb.Item  >
                        หน้าหลัก
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >แดชบอร์ด</Breadcrumb.Item>
                </Breadcrumb>

                <div className="justify-between flex mt-8 ">
                    <div>
                        <div className="justify-between flex items-center gap-4 ms-1 me-5 ">
                            <div>
                                <div className="w-52 justify-between flex  border border-gray-200 p-4 shadow rounded-sm">
                                    <i className="fas fa-users"></i>
                                    <div>
                                        <p className="text-md">88 </p>
                                        <span className="text-sm">รออนุมัติ</span>
                                    </div>
                                </div>

                                
                            </div>
                            <div>
                                <div className="w-52 justify-between flex  border border-gray-200 p-4 shadow rounded-sm">
                                    <i className="fa-solid fa-calendar-check me-2"></i>
                                    <div>
                                        <p className="text-md">88 </p>
                                        <span className="text-sm">รออนุมัติ</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="w-52 justify-between flex  border border-gray-200 p-4 shadow rounded-sm">
                                    <i className="fa-solid fa-calendar-check me-2"></i>
                                    <div>
                                        <p className="text-md">88 </p>
                                        <span className="text-sm">รออนุมัติ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" ">
                        <Card className="max-w-sm bg-[#7B66FF]">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>

                        </Card>
                    </div>



                </div>
            </div>
        )
    }
}