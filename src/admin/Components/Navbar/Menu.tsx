import React from 'react';

interface MenuProps {
    MenuLists?:
    {
        Name: string,
        Link: string
    }[]
}


export default function Menu(props: MenuProps) {
    return (
        <div className="wrap">
                <ul className='flex items-center justify-between gap-3'>
                    {props.MenuLists?.map((item, index) => (
                        <li key={index}>
                            <a href={item.Link} className='text-primary-color font-bold pb-2 border-b-[3px] border-solid border-primary-color'>{item.Name}</a>
                        </li>
                    ))}
                </ul>
        </div>
    )
}