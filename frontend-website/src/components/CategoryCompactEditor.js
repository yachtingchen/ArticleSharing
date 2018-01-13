import React, { PropTypes } from 'react';
import { Button, Checkbox, Header } from 'semantic-ui-react'
// import intl from '../utils/intl';

const inputStyle = {
    margin: '7px'
}

//semantic ui Input element with custom 'wdith' style will cause problem in IE11
const CategoryCompactEditor = (props) => (
    <div>
        <Checkbox toggle onChange={props.onIsVisibleChange}/>
        <input size="1"/>
        <Header as="span" size="mini">學習</Header> 
        <Button size="mini">新增</Button>
        <Button size="mini">刪除</Button>
    </div>
);

CategoryCompactEditor.propTypes = {
    onIsVisibleChange: PropTypes.func.isRequired,
};

export default CategoryCompactEditor;
