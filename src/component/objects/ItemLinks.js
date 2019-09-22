/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

import './ItemLinks.css';

function ItemLinks(props) {
    const {title, items} = props;

    // if no items exist then don't render anything
    if (!items) {
        return null;
    }

    return(
        <React.Fragment>
            <h3>{title}</h3>
            <div className="item-links">
                { // generates an item for each link
                    items.map((item) => <ItemLink key={item.name} item={item}/>)
                }
            </div>
        </React.Fragment>
    );
}

function ItemLink(props) {
    const {item} = props;

    return(
        <React.Fragment>
            <Link to={"/view" + item.reference}>
                <div className="item-link">
                    <h4>{item.name}</h4>
                    <p>{item.relation}</p>
                </div>
            </Link>
            <Divider className="item-divider"/>
        </React.Fragment>
    );
}

export default ItemLinks;