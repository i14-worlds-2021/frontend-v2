import React from 'react';
import './PixelImagePreview.scss';


const MOUNTING_DELAY = 300;


class PixelImagePreview extends React.Component {

    constructor(props) {
        super(props);

        const alt = "alt" in this.props ? this.props.alt : "-";
        const src = this.props.src;
        const previewSrc = getPreviewSrc(props);

        // The state alt, previewSrc and pendingSrc switches right away!

        // After the MOUTING_DELAY the src switches as well and the <img>
        // with the full src is actually mounted in the DOM

        this.state = {
            alt: alt,
            previewSrc: previewSrc,

            mounted: false,
            loaded: false,
            src: "",
            pendindSrc: src,
            pendingUpdate: undefined,
        }

        this.delay = ("noDelay" in props ? (props["noDelay"] ? 0 : MOUNTING_DELAY) : MOUNTING_DELAY);

        console.log({delay: this.delay});

        this.state.pendingUpdate = setTimeout(() => {
            console.log("initial mounting");
            this.setState({mounted: true, src: src});
        }, this.delay);
    }

    componentDidUpdate(prevProps, prevState, SS) {
        const newAlt = "alt" in this.props ? this.props.alt : "-";
        const newSrc = this.props.src;
        const newPreviewSrc = getPreviewSrc(this.props);

        if (prevState.pendingSrc !== newSrc || prevState.previewSrc !== newPreviewSrc) {
            // Every time the pendingSrc (=src after MOUNTING_DELAY) or previewSrc changes

            if (prevState.mounted || (prevState.pendingSrc !== newSrc)) {
                // this.state.mounted -> when old image was mounted

                // this.state.pendingSrc !== newSrc -> when old image was not mounted
                // (very fast src prop changes)

                if (prevState.mounted) {
                    console.log("un-mounting");
                }

                // Abort pendingUpdate
                clearTimeout(prevState.pendingUpdate);

                // Initialize new pendingUpdate
                let pendingUpdate = setTimeout(() => {
                    console.log("re-mounting");
                    this.setState({alt: newAlt, src: newSrc, mounted: true});
                }, this.delay);

                // Update state to new PixelPreview
                this.setState({
                    mounted: false, loaded: false, previewSrc: newPreviewSrc,
                    pendingUpdate: pendingUpdate, pendingSrc: newSrc
                })
            }
        }
    }

    render() {

        const className = "imageComponent " + ("className" in this.props ? this.props.className : "")

        return (
            <React.Fragment>
                {this.state.mounted && (
                    <img alt={this.state.alt} className={className}
                         style={{display: (this.state.loaded ? "block" : "none")}}
                         src={this.state.src} onLoad={() => this.setState({loaded: true})}
                    />
                )}
                <img alt={this.state.alt} className={"pixelImagePreview " + className}
                     style={{display: (this.state.loaded ? "none" : "block")}} src={this.state.previewSrc}
                />
            </React.Fragment>
        )
    }
}

export class PixelImagePreview2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: false
        };

        this.previewSrc = getPreviewSrc(props);
        this.delay = ("noDelay" in props ? (props["noDelay"] ? 0 : MOUNTING_DELAY) : MOUNTING_DELAY);
        this.className = "imageComponent " + ("className" in props ? props.className : "");
        this.alt = "alt" in this.props ? this.props.alt : "-";
    }

    componentDidMount() {
        const img = new Image();
        img.onload = () => {
            this.setState({
                loaded: true
            });
        };
        img.onerror = () => {
            this.setState({
                error: true
            });
        };
        setTimeout(() => {
            img.src = this.props.src;
        }, this.delay);
    }

    render() {
        if (this.state.error) {
            return (
                <img
                    className={this.className}
                    src={this.previewSrc}
                    alt={this.alt}
                />
            )
        } else if (!this.state.loaded) {
            return (
                <img
                    className={this.className}
                    src={this.previewSrc}
                    alt={this.alt}
                />
            )
        }
        return (
            <img
                className={this.className}
                src={this.props.src}
                alt={this.alt}
            />
        )
    }
}


function getPreviewSrc(props) {
    let previewSrc = "";

    if ("previewAppendix" in props) {
        previewSrc = insertAppendix(props.src, props["previewAppendix"]);
    } else if ("previewSrc" in props) {
        previewSrc = props["previewSrc"];
    }

    return previewSrc;
}

export function insertAppendix(filename, appendix) {
    let filenameList = filename.split(".");
    let newFilename = ""
    for (let i = 0; i < filenameList.length - 1; i++) {
        newFilename += filenameList[i]
        if (i !== filenameList.length - 2) {
            newFilename += "."
        }
    }
    return newFilename + appendix + "." + filenameList[filenameList.length - 1];
}


export default PixelImagePreview;
