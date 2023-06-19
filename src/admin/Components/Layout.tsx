import React from 'react';


export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className="border-b-[1px] border-solid border-b-[#DCDCDE]">
            <div className='wrap'>
               {children}
            </div>
        </div>
    )
}