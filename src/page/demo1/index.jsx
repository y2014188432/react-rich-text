/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
import React, { useImperativeHandle, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import Quill from "quill";
import WidthButton from "./toolbar/quill-size-btn";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import BlotFormatter from "quill-blot-formatter";
import ImageStyle from "./format/image-style";
import "./editor.css";
import { CustomImageSpec } from "./module/blot-formatter-action";
import Delta from "quill-delta";
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register(ImageStyle, true);
var SizeStyle = Quill.import("attributors/style/size");
console.info(SizeStyle.whitelist);
Quill.register(SizeStyle, true);
const AlignAttribute = Quill.import("attributors/style/align");
Quill.register(AlignAttribute, true);
const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [{ script: "sub" }, { script: "super" }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
    ],
    blotFormatter: {
        specs: [CustomImageSpec],
    },
};
const QuilluQ = (props, ref) => {
    const { id } = props;
    const quillRef = useRef();
    useImperativeHandle(ref, () => ({
        getContent: () => {
            const delta = quillRef.current.getContents();
            // console.info("delta", delta);
            const converter = new QuillDeltaToHtmlConverter(delta.ops, {
                inlineStyles: true,
                customTagAttributes: (op) => {
                    if (op.insert.type === "image") {
                        console.info(op);
                        const obj = {
                            style: op.attributes.style,
                        };
                        if (op.attributes.pw) {
                            obj.width = op.attributes.pw;
                        }
                        return obj;
                    }
                    return undefined;
                },
            });
            return converter.convert();
        },
        setContent(text) {
            if (text && quillRef.current) {
                const data = quillRef.current?.clipboard.dangerouslyPasteHTML(text);
                console.info(quillRef.current, "delta data", data);
            }
        },
    }));
    useEffect(() => {
        if (id) {
            const quill = new Quill(`#${id}-quill-editor`, {
                theme: "snow",
                modules,
            });
            const sizeButton = document.createElement("span");
            sizeButton.classList.add("ql-formats");
            ReactDom.render(<WidthButton quillContainer={quill.root}/>, sizeButton);
            quill.getModule("toolbar").container.appendChild(sizeButton);
            quill.on("text-change", function (delta, oldDelta, source) {
                console.info(delta, oldDelta);
                for (const op of delta.ops) {
                    if (op.insert && op.insert?.image) {
                        // quill.updateContents(new Delta().))
                        console.info("range", quill.getSelection());
                        const range = quill.getSelection();
                        console.info("get last", quill.getContents(range?.index, 1));
                        if (range) {
                            quill.updateContents(new Delta()
                                .retain(range?.index)
                                .delete(1)
                                .insert({ image: op.insert.image, }, { width: "100%" }), "silent");
                        }
                    }
                }
                console.info(delta);
            });
            quillRef.current = quill;
        }
        return () => {
            quillRef.current?.getModule("toolbar")?.container?.remove();
            quillRef.current?.root?.remove();
        };
    }, [id]);
    return (<>
      <div id="quill-custom-toolbar"></div>
      <div id={`${id}-quill-editor`} style={{ height: "800px", overflowY: "scroll" }}></div>
    </>);
};
export default React.forwardRef(QuilluQ);
