import React from "react";
import { Popconfirm, Icon } from "antd";
import {connect} from "react-redux";
import {compose} from "redux";

import {deleteRelation} from '../../store/Actions/userActions'

/*
    Delete relation with pop confirm.
*/
const DeleteRelation = (props) => {
    const {item, objType, docId, fieldName} = props
    
    const handleDelete = e => {
        props.deleteRelation(objType, docId, item.reference, fieldName);
    }
    
    return(
        <Popconfirm
            title="Are you sure you want to remove this relation？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
            okType={"danger"}
            okText="DELETE"
            onConfirm={handleDelete}
        >
        <Icon type="close-circle" style={{color:'red'}}/>   
        </Popconfirm>
    )
}

const mapDispatchToProps = dispatch => {
    return {
       deleteRelation: (objType, docId, targetRef, fieldName) => dispatch(deleteRelation(objType, docId, targetRef, fieldName))
    };
 };
 
 export default compose(
    connect(
       null,
       mapDispatchToProps
    )
 )(DeleteRelation);