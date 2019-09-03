/* * *
 * ArtefactListElement :: ReactJS Component
 * A simple representation of an artefact for a list.
 * The artefact should be passed to this component.
 * Created By: Lawson Wang-Wills
 */

// libs
import React from 'react';

function ArtefactListElement(props) {
    const artefact = props.artefact;

    return(
        <div>
            <span>{ artefact.name } | { artefact.details }</span>
        </div>
    );
}

export default ArtefactListElement;