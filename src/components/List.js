import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import { getItems } from '../actions/listActions'

const List = ({ list: { items, loading, filter }, getItems }) => {
    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, [])
    if (loading || !items || items.length === 0) return (
        <div className="ListSection">
            <p style={{ padding: "25px", color: 'white' }}>There is no items. Please add some.</p>
        </div>
    )
    return (
        <div className="ListSection">
            {filter ? filter.map(item => (
                <ListItem item={item} key={item.id} />
            ))
                : items.map(item => (
                    <ListItem item={item} key={item.id} />
                ))}
        </div>
    )
}

List.prototype = {
    list: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    list: state.list
})
export default connect(mapStateToProps, { getItems })(List)
