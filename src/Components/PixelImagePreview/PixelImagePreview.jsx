
import React, {useState} from 'react';
import PixelPreview from './64px.jpg';

import './PixelImagePreview.scss';


function PixelImagePreview(props) {

    let [loaded, setLoaded] = useState(false);

    return (
        <React.Fragment>
            <img alt={"alt" in props ? props.alt : "-"}
                 className="imageComponent"
                 src={props.src}
                 onLoad={() => setLoaded(true)}
                 style={{display: loaded ? "block" : "none"}}
            />
            <img alt={"alt" in props ? props.alt : "-"}
                 className="imageComponent pixelImagePreview"
                 src={"preview" in props ? props.preview : PixelPreview}
                 style={{display: loaded ? "none" : "block"}}
            />
        </React.Fragment>
    )
}

export default PixelImagePreview;
