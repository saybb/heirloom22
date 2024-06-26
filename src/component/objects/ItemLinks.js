/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
 */

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Divider, Row, Icon} from 'antd';
import RelationForm from '../forms/RelationForm'
import DeleteRelation from '../util/DeleteRelation';
import './ItemLinks.css';

function ItemLinks(props) {
    const {title, items, objType, obj, docId, fieldName} = props;
    // set icon style
    const iconType = (title) => {
        if(title === 'Related People') return "usergroup-add"
        if(title === 'Related Events') return "file-add"
    }

    const header = (title) => {
        if (title === 'Related Artefacts'){
            return (
                <h3>
                    <Row style={{display: 'flex', alignItems:'center'}}>
                        {title}
                    </Row>
                </h3> 
            )
        }
        return(
            <h3>
                <Row style={{display: 'flex', alignItems:'center'}}>
                    {title}
                    <Divider type="vertical"/>
                    <RelationForm 
                        title={title}
                        artefact={obj}
                        artefact_id={docId}
                        iconType={iconType(title)}
                    />
                </Row>
            </h3>
        )
    }

    // if no items exist then don't render anything
    if (!items || items.length === 0) {
        return (
            <React.Fragment>
                {header(title)}
                <div className="polaroid">
                    <div className="container">
                        <p>No {title} to show. Use the <Icon type={iconType(title)} style={{color: 'DodgerBlue'}}/> icon to add a relation!</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
            {header(title)}
                { // generates an item for each link
                items.map((item) => <ItemLink 
                key={item.name} 
                item={item} 
                fieldName={fieldName}
                objType={objType} 
                docId={docId}
                />)
                }
        </React.Fragment>
    );
}

function ItemLink(props) {
    const {item, objType, docId, fieldName} = props;
    /*
        update state from reference. 
        this.state and this.setState return from useState hooks in functional component.
    */
    const [itemDetails, setDetails] = useState({});


    /* 
        useEffect function can replace both componentDidMount and componentDidupdate
        in functional componment
    */
    useEffect(() => {
        item.reference.get()
            .then( snapshot => {
                setDetails(snapshot.data());
            })
    });

    return(
        <div className="polaroid container">
            <h4>
                <Link to={"/view/" + item.reference.path}>{itemDetails ? itemDetails.name : null}</Link>
                <Divider type="vertical"/>
                <DeleteRelation
                    item={item}
                    objType={objType}	
                    docId={docId}	
                    fieldName={fieldName}	
                />
            </h4>
            <p>{item.relation}</p>
        </div>
    );
}

export default ItemLinks;