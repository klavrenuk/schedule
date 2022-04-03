import React, {useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import {Row, Col, Button, Input} from 'reactstrap';

import SectionListTasks from "./SectionListTasks";
import WrapClickListener from "./WrapClickListener";

import './css/section.min.css';

export default function Section(props) {
    const [isOpenList, setIsOpenList] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [section, setSection] = useState(props.data);
    const sectionId = `section-${section._id}`;

    const destroyListener = () => setIsEdit(false);

    const onKeyDown = (event) => {
        if(event.code === 'Enter' || event.code == 'Escape') {
            setIsEdit(false);
        }
    }

    const onChange = (event) => setSection({
        ...section,
        name: event.target.value
    });

    const onEdit = () => setIsEdit(true);

    return (
        <li id={sectionId}
            className={'section item_for_editing'}
        >
            <Row className={'flex flex--align_center'}>
                <Col sm={isEdit ? 12 : 8}>
                    {
                        isEdit ?
                            <Input className={'section-name item_for_editing-text active'}
                                value={section.name}
                                onKeyDown={(event) => onKeyDown(event)}
                                onChange={(event) => onChange(event)}
                                disabled={!isEdit}
                            />
                            :
                            <div className={'flex flex--align_center'}>
                                <span className={'section-name section-name--static'}>{section.name}</span>
                                <Button color={'icon'}
                                        className={'section-btn_toggle'}
                                        onClick={() => setIsOpenList(!isOpenList)}
                                >
                                    {
                                        isOpenList ? <AiOutlineUp /> : <AiOutlineDown />
                                    }
                                </Button>
                            </div>
                    }
                </Col>

                <Col sm={4}
                     className={
                         `item_for_editing-controller ${isEdit ? 'active' : ''}`
                     }
                >
                    <div className={'text-right'}>
                        <Button color={'icon'}
                                onClick={() => onEdit()}
                        >
                            <AiFillEdit />
                        </Button>
                        <Button color={'icon'}>
                            <AiFillDelete />
                        </Button>
                    </div>
                </Col>
            </Row>

            {
                isOpenList ? <SectionListTasks
                    list={props.data.tasks}
                    section={section}
                /> : null
            }

            <WrapClickListener parentElem={sectionId}
                               isEdit={isEdit}
                               destroyListener={destroyListener}
            />
        </li>
    )
}