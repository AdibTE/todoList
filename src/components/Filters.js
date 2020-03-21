import React from 'react';
import { connect } from 'react-redux';
import { filterItem } from '../actions/listActions'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Filters = ({ filterItem , filterName }) => {
    const Button = styled.button`
        background-color: ${props => (props.isSelected ? '#de6843' : '#2f2f2f')};
        border: 5px solid ${props => (props.isSelected ? '#de6843' : '#424242')};
        border-radius: 5px;
        color: ${props => (props.isSelected ? '#2f2f2f' : '#de6843')};
        font-weight:900;
        font-size:18px;
        flex:1;
        height:50px;
        cursor:pointer;
        transition:0.2s ease-out;
        &:hover {
            background-color: ${props => (props.isSelected ? '#de6843' : '#424242')};
        }
        `;
    return (
        <div className="Filters">
            <Button onClick={() => { filterItem(null) }} isSelected={filterName === null}>ALL</Button>
            <Button onClick={() => { filterItem(false) }} isSelected={filterName === false}>TODO</Button>
            <Button onClick={() => { filterItem(true) }} isSelected={filterName === true}>COMPLETED</Button>
        </div>
    )
}

Filters.prototype = {
    filterItem: PropTypes.func.isRequired,
    filterName: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    filterName: state.list.filterName
})
export default connect(mapStateToProps, { filterItem })(Filters)
