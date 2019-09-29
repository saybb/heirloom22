/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded  } from 'react-redux-firebase'
import { compose } from 'redux'

// components
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import "./Gallery.css"
import Addendum from "./Addendum";
import faker from "faker";

const Artefact = (props) => {
    const { artefact } = props;
    const id = props.match.params.id;

    if (!isLoaded(artefact)){
        return (
            <div className="object-content">
                <h2>Artefact is loading...</h2>
            </div>
        )
    }
    
    if(isEmpty(artefact)){
        return (
              <div className="object-content">
                  <h2>Artefact is NOT FOUND</h2>
              </div>
        );
    }
    
    return (
        <div>
            <div className="tech-slideshow">
                <div className="mover-1"></div>
                <div className="mover-2"></div>
            </div>

        <div className="object">

            <div className="object-content">
                <h2>{artefact[id].name}</h2>
                <p>{artefact[id].details}</p>
                {/* ItemLinks will render links as items with names and relation descriptors */}
                <ItemLinks title="Related People" items={artefact[id].people_links}/>
                <ItemLinks title="Related Events" items={artefact[id].events_links}/>
                <Addendum />

            </div>
        </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const artefact = state.firestore.data.Artefacts;   
    return {
        artefact: artefact
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>[{
        collection: 'Artefacts', 
        doc: props.match.params.id,
    }])
)(Artefact)





