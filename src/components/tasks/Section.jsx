import React, {useState} from 'react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import SectionListTasks from "./SectionListTasks";

import './css/section.min.css';

export default function Section(props) {
    const [isOpenList, setIsOpenList] = useState(false);

    console.log('section', props);

    return (
        <li className={'section'}>
            <a className={'section-link'}
               onClick={() => setIsOpenList(!isOpenList)}
            >
                <span>{ props.data.name}</span>
                {
                    isOpenList ? <AiOutlineUp /> : <AiOutlineDown />
                }
            </a>

            {
                isOpenList ? <SectionListTasks list={props.data.tasks} /> : null

            }
        </li>
    )
}