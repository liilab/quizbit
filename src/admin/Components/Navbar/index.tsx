import React from 'react';
import Menu from './Menu';

export default function Navbar(props: any) {
    const MenuLists = [
        {
            Name: 'Add New Quiz',
            Link: '#'
        },
    ]

    return (
        <div className="">
            <div className='flex items-center gap-5 border-b-2 border-solid border-[#DCDCDE]'>
                <h1>QuizBit</h1>
                <Menu MenuLists={MenuLists} />
            </div>
        </div>
    )
}