/* * *
 * Person :: ReactJS Component
 * Page for the display of a Person.
 * The person should be passed to this component as the prop "person".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";

const Person = (props) => {
    const { person } = props;
    const id = props.match.params.id;
    
    if (!isLoaded(person)){
        return (
            <div className="object-content">
                <h2>Person is loading...</h2>
            </div>
        )
    }
    
    if (isEmpty(person)) {
        return(
            <div className="object-content">
            <h2>Person is NOT FOUND</h2>
        </div>
        );
    }
        
    return(
        <div className="object-content">
            <h2>{person[id].name + " " + person[id].lastname}</h2>
            <p>{"Born: " + person[id].dob.toDate()}</p>
            <p>{person[id].details}</p>
            <ItemLinks title="Related Artefacts" items={person[id].artefacts_links}/>
        </div>
    );
} 

const mapStateToProps = (state) => {
    const person = state.firestore.data.People;  
    return {
        person: person,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>[{
        collection: 'People', 
        doc: props.match.params.id,
    }])
)(Person);