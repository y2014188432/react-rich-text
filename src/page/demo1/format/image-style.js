import Quill from "quill";
// const DefaultImage = Quill.import("formats/image");
const DefaultImage = Quill.import("formats/image");
const ATTRIBUTES = ["alt", "height", "width", "style", "pw"];
class ImageStyle extends DefaultImage {
    static formats(domNode) {
        // console.info(domNode);
        const ff = ATTRIBUTES.reduce((formats, attribute) => {
            // console.info(formats, attribute, domNode);
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
        return ff;
    }
    format(name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            }
            else {
                this.domNode.removeAttribute(name);
            }
        }
        else {
            super.format(name, value);
        }
    }
}
export default ImageStyle;
