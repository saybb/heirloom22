/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
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
            <div className="text">
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
            <div className="ui raised very padded text container segment">
                <div className="content">
                    <Link to={"/view/" + item.reference.path}>
                        <div className="content">
                            <h4>{item.name}</h4>
                            <p>{item.relation}</p>
                        </div>
                    </Link>
                </div>
                <Divider className="item-divider"/>
            </div>
        </React.Fragment>
    );
}

export default ItemLinks;