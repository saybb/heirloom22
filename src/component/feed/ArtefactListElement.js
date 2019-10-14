/* * *
 * ArtefactListElement :: ReactJS Component
 * A simple representation of an artefact for ArtefactList.
 * The artefact should be passed to this component.
 */

import React from 'react';
import { Divider, Card, Col } from 'antd';
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
        // <React.Fragment>
        //     <div className="card">
        //         <div className="ArtefactListElement">
        //             <Link to={"/view/artefacts/" + reference}>

        //                 <b>{ excerpt(artefact.name, TITLE_LENGTH) }</b>
        //                 { // only show details section if it's not empty
        //                     artefact.details && " | " + excerpt(artefact.details, DESC_LENGTH)
        //                 }
        //             </Link>
        //         </div>
        //         <Divider className="ArtefactListElementDivider" />
        //     </div>
        // </React.Fragment>

        artefact ? 
                <Col span={8}>
                     <Link to={"/view/artefacts/" + reference}>
                    {(artefact.media_links||[]).length > 0 ?
                    <Card
                            hoverable
                            style={{ width: 300, marginTop: 16 }}
                            cover={<img alt="cover" src={artefact.media_links[0].url} />}
                        >
                            <Meta title={artefact.name} description={artefact.description} />
                    </Card>
                    :
                    <Card hoverable style={{ width: 300, marginTop: 16 }}>
                        <Meta title={artefact.name} description={artefact.description} />
                    </Card>
                    }
                    </Link>             
                </Col>
        :
        <p>Nothing to show</p>
    );
}

export default ArtefactListElement;