import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}


export default function Layout({ children }: LayoutProps) {
    return (
        <div className="border-b-[1px] border-solid border-b-[#DCDCDE]">
            <div className='wrap'>
               {children}
            </div>
        </div>
    )
}