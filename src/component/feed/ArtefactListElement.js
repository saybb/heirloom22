/* * *
 * ArtefactListElement :: ReactJS Component
 * A simple representation of an artefact for ArtefactList.
 * The artefact should be passed to this component.
 */

import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
/**
 * Function element.
 * Props:
 *   - artefact : artefact json object to be represented
 */
function ArtefactListElement(props) {
    const { artefact, reference } = props;
    const TITLE_LENGTH = 50;       // maximum length of title in chars
    const DESC_LENGTH = 100;       // maximum length of description in chars


    /**
     * Simple function that shortens a string if it's longer than given length
     * and adds "...".
     * @param {String} str
     * @param {Int} n
     */
    function excerpt(str, n) {
        if (str.length > n) {
            // want length to be exactly n
            return str.substring(0, n-2) + "...";
        } else {
            return str;
        }
    }

    /**
     * For the list, we intend to show:
     *   - name
     *   - excerpt of description
     */
    return(
        // check if null artefact as a safeguard to prevent crash.
        artefact
        ? 
        <div>
            <Link to={"/view/artefacts/" + reference}>
                <Card
                    hoverable
                    className="artefact-list-element"
                    cover={(artefact.media_links||[]).length > 0
                        ? <img alt="cover" src={artefact.media_links[0].url} />
                        : null
                    }
                >
                    <Meta
                        title={excerpt(artefact.name, TITLE_LENGTH)}
                        description={artefact.description && excerpt(artefact.description, DESC_LENGTH)}
                    />
                </Card>
            </Link>             
        </div>
        : <p>Nothing to show</p>
    );
}

export default ArtefactListElement;
