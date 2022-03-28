import React, {useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import {Row, Col, Button} from 'reactstrap';

import SectionListTasks from "./SectionListTasks";

import './css/section.min.css';

export default function Section(props) {
    const [isOpenList, setIsOpenList] = useState(false);

    return (
        <li className={'section'}>
            <Row className={'flex flex--align_center'}>
                <Col sm={8}>
                    <a className={'section-link'}
                       onClick={() => setIsOpenList(!isOpenList)}
                    >
                        <span className={'section-link-name'}>{ props.data.name}</span>
                        <span className={'section-link-icon'}>
                            {
                                isOpenList ? <AiOutlineUp /> : <AiOutlineDown />
                            }
                        </span>
                    </a>
                </Col>

                <Col sm={4}>
                    <div className={'text-right'}>
                        <Button color={'icon'}>
                            <AiFillEdit />
                        </Button>
                        <Button color={'icon'}>
                            <AiFillDelete />
                        </Button>
                    </div>
                </Col>
            </Row>

            {
                isOpenList ? <SectionListTasks list={props.data.tasks} /> : null

            }
        </li>
    )
}