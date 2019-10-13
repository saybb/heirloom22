/* * *
 * ItemLinks :: ReactJS Component
 * Page for the display of a link to an item.
 * Shows the item name and its relation.
 */

import React from 'react';
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