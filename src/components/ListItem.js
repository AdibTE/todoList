import React, { useState, Fragment, useRef } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { checkItem, deleteItem, editItem } from '../actions/listActions';
import PropTypes from 'prop-types'

const ListItem = ({ item: { text, isDone, id }, checkItem, deleteItem, editItem }) => {
    const [isEditing, setEditing] = useState(false)
    const [editedText, setText] = useState(text)
    const [isDeleting, setDeleting] = useState(false)
    const timer = useRef(false)

    const save = () => {
        editItem(id, editedText);
        setEditing(false)
        if (editedText === "") {
            deleteItem(id)
        }
    }
    const cancel = () => {
        setEditing(false)
        setText(text)
    }
    const undo = () => {
        setDeleting(false)
        clearTimeout(timer.current)
    }
    const deleteI = () => {
        setDeleting(true)
        timer.current = setTimeout(() => {
            deleteItem(id)
        }, 3000);
    }
    const CheckBox = styled.div`
        border:2px solid #de6843;
        border-radius:5px;
        height:20px;
        width:20px;
        cursor:pointer;
        transition:0.2s ease;
        background-color: ${isDone ? '#de6843' : `transparent`};
        &:hover{
            opacity:0.5;
        }
        `;
    const Paragraph = styled.p`
        margin: 0;
        margin-left: 25px;
        color: white;
        font-weight:900;
        font-size:12px;
        user-select:none;
        padding-right:115px;
        text-decoration: ${isDone ? 'line-through' : `none`};
        `;
    const ActionBtn = styled.button`
        margin: 0;
        border: 0;
        height: 20px;
        cursor: pointer;
        color:${isEditing ? '#2f2f2f' : `#de6843`};
        background-color: ${isEditing ? '#de6843' : `#2f2f2f`};
        transition: 0.2s ease;
        opacity: ${isEditing ? '.7' : `0.5`};
        `;
    if (isDeleting) return (
        <p style={{ padding: "0 25px", color: 'white', fontSize: "12px" }}>
            Item deleted... <ActionBtn onClick={undo}>undo</ActionBtn>
        </p>
    )
    return (
        <div>
            <CheckBox onClick={() => checkItem(id)}></CheckBox>
            {isEditing ? (
                <Fragment>
                    <input value={editedText} onChange={(e) => setText(e.target.value)} className="editBox" />
                    <div className="itemActions">
                        <ActionBtn onClick={save}>Save</ActionBtn>
                        <ActionBtn onClick={cancel}>Cancel</ActionBtn>
                    </div>
                </Fragment>
            ) : (
                    <Fragment>
                        <Paragraph>{text}</Paragraph>
                        <div className="itemActions">
                            <ActionBtn onClick={() => setEditing(true)}>Edit</ActionBtn>
                            <ActionBtn onClick={deleteI}>Delete</ActionBtn>
                        </div>
                    </Fragment>
                )
            }
        </div >
    )
}

ListItem.prototype = {
    item: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
}

export default connect(null, { checkItem, deleteItem, editItem })(ListItem)