/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { PageHeader, Tag, Spin } from 'antd';

// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';
import ArtefactHandler from "../forms/ArtefactHandler.js";
import { ARTEFACTS } from "../../store/objectTypes";

class ArtefactList extends React.Component {
    
    render() {
        const { artefacts, profile } = this.props;
        if(!artefacts){
            return (
                <div className="container center">
                    <Spin tip="Loading artefacts..." size="large" />
                </div>
            )
        }
        if(artefacts && !Object.keys(artefacts)){
            return (
                <div className="container center">
                    <h2>No artefact found.</h2>
                </div>
            )
        }
        return(
            <React.Fragment>
                <PageHeader
                    onBack={() => window.history.back()}
                    title="Browsing your collection"
                    tags={<Tag color="blue">{profile.name}</Tag>}
                    extra={[
                        <ArtefactHandler type={"create"} />
                    ]}
                    avatar={{ src: profile.photoURL }}
                >
                </PageHeader>
                <div className="artefact-list-wrapper">
                    <div className="artefact-list">
                        { artefacts && Object.entries(artefacts).map(([id, artefact]) => <ArtefactListElement key={id} reference={id} artefact={artefact}/>)}  
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      artefacts: state.firestore.data.Artefacts,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [{
        collection: ARTEFACTS,
    }])
)(ArtefactList)