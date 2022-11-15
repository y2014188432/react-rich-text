import React from "react";
const WidthButton = ({ range = [20, 40, 60, 80, 100], quillContainer }) => {
    const spanRef = React.useRef();
    return (<>
      <span ref={spanRef} className=" ql-picker ql-icon-picker " title="编辑器宽度" onMouseLeave={() => {
            spanRef.current?.classList.remove("ql-expanded");
        }} onMouseOver={() => {
            spanRef.current?.classList.add("ql-expanded");
        }}>
        <span className="ql-picker-label" role="button" aria-expanded="true" aria-controls="ql-picker-options-9">
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2423" width="16" height="18">
            <path d="M1020.8 665.472H0.128v-0.256H0V26.496h0.128V25.472H1020.928v561.344h0.512v78.656h-0.64z m-64.576-576.96H61.312l2.944 513.92h894.976l-3.008-513.92zM125.376 858.496h768v-76.032l124.48 110.912-124.48 105.088v-78.08h-768v78.08L3.392 891.136l121.984-108.672v76.032z" p-id="2424"></path>
          </svg>
        </span>
        <span className="ql-picker-options" aria-hidden="false" id="ql-picker-options-6">
          {range.map((v) => (<span key={v} role="button" className="ql-picker-item" style={{ width: "auto" }} onClick={() => {
                if (!quillContainer) {
                    return;
                }
                const w = ((quillContainer.parentElement?.clientWidth || 0) /
                    window.innerWidth) *
                    (100 - v);
                quillContainer.style.borderRight = `${w}vw solid #fbfbfbba`;
            }}>
              {v}%
            </span>))}
        </span>
      </span>
    </>);
};
export default WidthButton;
