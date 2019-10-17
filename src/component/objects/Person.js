/* * *
 * Person :: ReactJS Component
 * Page for the display of a Person.
 */

import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {PageHeader, Descriptions,Spin} from 'antd';
import moment from 'moment';
import DelComfirmation from "../forms/DelComfirmation";
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import { PEOPLE } from '../../store/objectTypes.js';

const Person = (props) => {
    const { person } = props;
    const id = props.match.params.id;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    if (!person){
        return (
            <div className="object-content">
                <Spin tip="Loading..." size="large"/>
            </div>
        )
    }
    
    if (person && !person[id]) {
        return(
            <div className="object-content">
                <h2>Person is NOT FOUND</h2>
            </div>
        );
    }
        
    return(
        <div>
            <PageHeader
               onBack={() => window.history.back()}
               title={person[id].name + " " + person[id].lastname}
               subTitle={'Born: '+ person[id].dob.toDate().toLocaleDateString("en-AU", options)}
            >
               <Descriptions size="small" column={2}>
               <Descriptions.Item label="Created by">{person[id].created_by}</Descriptions.Item>
                  <Descriptions.Item label="Created at">
                     {moment(person[id].date_created.toDate()).format('LL')}
                  </Descriptions.Item>
                  
                  {person[id].last_modified ?
                  <Descriptions.Item label="Last Modified">
                   {moment(person[id].last_modified.toDate()).calendar()}
                  </Descriptions.Item>
                  :
                  null
                  }
               </Descriptions>
            </PageHeader>
            <DelComfirmation
                  docId={id}
                  objType={PEOPLE}
                  history={props.history}
               />
            <div className="object-content">
                <p>{person[id].details}</p>
                <ItemLinks 
                    title="Related Artefacts" 
                    fieldName='artefacts_links'
                    items={person[id].artefacts_links}
                    objType={PEOPLE}
                    docId={id}
                    />
            </div>
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