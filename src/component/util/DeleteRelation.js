import React from "react";
import { Popconfirm, Icon , Button} from "antd";
import {connect} from "react-redux";
import {compose} from "redux";

import {deleteRelation} from '../../store/Actions/userActions'


const DeleteRelation = (props) => {
    const {item, objType, docId, fieldName} = props
    
    const handleDelete = e => {
        //console.log(objType, docId, item.reference)
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
        <Button type="danger" ghost size='small'>
            Delete
        </Button>
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