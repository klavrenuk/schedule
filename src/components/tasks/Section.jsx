import React, {useState} from 'react';
import {AiFillDelete, AiFillEdit, AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import {Row, Col, Button} from 'reactstrap';
import {useDispatch} from 'react-redux';

import SectionListTasks from "./SectionListTasks";
import InputInList from "./InputInList";

import './css/section.min.css';

export default function Section(props) {
    const [isOpenList, setIsOpenList] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [section, setSection] = useState(props.data);
    const sectionId = `Section-${section._id}`;
    const dispatch = useDispatch();

    const onSave = (value) => {
        setSection({
            ...section,
            name: value
        });
        setIsEdit(false);
    };

    const onEdit = () => setIsEdit(true);

    const onDelete = () => dispatch({
        type: 'deleteSection',
        id: section._id
    });

    return (
        <li id={sectionId}
            className={'section item_for_editing'}
        >
            <Row className={'flex flex--align_center'}>
                <Col sm={isEdit ? 12 : 8}>
                    {
                        isEdit ?
                            <InputInList
                                value={section.name}
                                close={onSave}
                                parentElem={sectionId}
                                isEdit={isEdit}
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
                        <Button color={'icon'}
                                onClick={() => onDelete()}
                        >
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
        </li>
    )
}