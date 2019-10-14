/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {Divider, Row, Icon} from 'antd';
import RelationForm from '../forms/RelationForm'
import './ItemLinks.css';

function ItemLinks(props) {
    const {title, items, artefact, id} = props;
    
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
                    artefact={artefact}
                    artefact_id={id}
                    iconType={iconType(title)}
                />
                </Row>
            </h3>
        )
    }

    // if no items exist then don't render anything
    if (!items) {
        return (
            <React.Fragment>
                {header(title)}
                <div className="polaroid">
                <div className="container">
                <p>Ooops, you can update {title.toLowerCase()} by clicking the icon <Icon type={iconType(title)} style={{color: 'DodgerBlue'}}/> above. Your list shows up right here.</p>
                </div>
                </div>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
        {header(title)}
            { // generates an item for each link
                items.map((item) => <ItemLink key={item.name} item={item}/>)
            }
        </React.Fragment>
    );
}

function ItemLink(props) {
    const {item} = props;

    return(
        <div className="polaroid container">
            <h4>
                <Link to={"/view/" + item.reference.path}>{item.name}</Link>
                <Divider type="vertical"/>
                <Icon type="close-circle" style={{color:'red'}}/>
            </h4>
            <p>{item.relation}</p>
        </div>
    );
}

export default ItemLinks;