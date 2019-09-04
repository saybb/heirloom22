/* * *
 * ArtefactListElement :: ReactJS Component
 * A simple representation of an artefact for a list.
 * The artefact should be passed to this component.
 * Created By: Lawson Wang-Wills
 */

// libs
import React from 'react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';

function ArtefactListElement(props) {
    // unpack for nicer code
    const { artefact } = props;

    //function firstN
    /**
     * For the list, we intend to show:
     *   - name
     *   - excerpt of description
     */
    return(
        <React.Fragment>
            <div className="ArtefactListElement">
                <span>
                    <b>{ artefact.name }</b>
                    { // only show details section if it's not empty
                        artefact.details ? " | " + artefact.details : ""
                    }
                </span>
            </div>
            <Divider />
        </React.Fragment>
    );
}

export default ArtefactListElement;