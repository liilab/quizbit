import React from 'react';
import { Link } from "react-router-dom";
import { MenuProps } from './types';

export default function Menu({menus}: MenuProps) {
    return (
        <div className="wrap">
            <ul className='flex items-center justify-between gap-3'>
                {menus.map((menu, index) => (
                <li key={index}>
                    <Link to={menu.path} className='text-primary-color font-bold pb-2 border-b-[3px] border-solid border-primary-color'>{menu.name}</Link>
                </li>
                ))}
            </ul>
        </div>
    )
}