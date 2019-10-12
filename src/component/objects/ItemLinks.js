/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {Divider, Button, Row, Icon} from 'antd';


import './ItemLinks.css';
import './ListCard.css'

function ItemLinks(props) {
    const {title, items} = props;
    
    const iconType = (title) => {
        if( title === 'Related People') return "usergroup-add"
        if(title === 'Related Events') return "file-add"
    }

    // if no items exist then don't render anything
    if (!items) {
        return (
            <React.Fragment>
                <h3>{title}<Divider type="vertical"/><Button type="primary" shape="circle" icon={iconType(title)} ghost/></h3>
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
            <Row>
            <h3>{title}<Divider type="vertical"/><Button type="primary" shape="circle" icon="usergroup-add" ghost/></h3>
            </Row>
            { // generates an item for each link
                items.map((item) => <ItemLink key={item.name} item={item}/>)
            }
        </React.Fragment>
    );
}

function ItemLink(props) {
    const {item} = props;

    return(
        <div className="polaroid">
            <div className="container">
                <Link to={"/view/" + item.reference.path}>
                        <h4>{item.name}</h4>
                        <p>{item.relation}</p>
                </Link>
            </div>
        </div>
    );
}

export default ItemLinks;