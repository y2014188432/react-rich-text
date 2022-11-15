import { AlignAction, DeleteAction, ResizeAction, ImageSpec, } from "quill-blot-formatter";
class ResizeWidthAction extends ResizeAction {
    constructor(formatter) {
        super(formatter);
        // 拖动
        this.onDrag = (event) => {
            if (!this.formatter.currentSpec) {
                return;
            }
            const target = this.formatter.currentSpec.getTargetElement();
            if (!target) {
                return;
            }
            const deltaX = event.clientX - this.dragStartX;
            let newWidth = 0;
            if (this.dragHandle === this.topLeftHandle ||
                this.dragHandle === this.bottomLeftHandle) {
                newWidth = Math.round(this.preDragWidth - deltaX);
            }
            else {
                newWidth = Math.round(this.preDragWidth + deltaX);
            }
            let width = "";
            // 除去内边距的内部可视区域宽度
            const innerWidth = this.formatter.quill.root.clientWidth - 30;
            if (this.mode === "px") {
                width = `${Math.min(newWidth, innerWidth)}`;
            }
            else {
                width = `${Math.min(Math.round((newWidth * 10000) / innerWidth) / 100, 100)}%`;
                target.setAttribute("pw", width);
            }
            target.setAttribute("width", width);
            this.formatter.update();
        };
        this.mode = this.getInitMode();
        const [sizeInfoPanel, sizeInfo] = this.initSizeInfo();
        this.sizeInfo = sizeInfo;
        this.sizeInfoPanel = sizeInfoPanel;
        console.info(this.mode);
    }
    initSizeInfo() {
        const div = document.createElement("div");
        div.setAttribute("class", "quill-blot-formatter-size-info-block");
        //   "display: inline-block; background: #38383869; color: white; padding: 3px 8px 0 10px; font-weight: bold;",
        const span = document.createElement("span");
        const button = document.createElement("button");
        button.classList.add("quill-blot-formatter-size-info-block-unit-switch");
        button.innerHTML = "切换单位";
        const _this = this;
        // 切换宽度单位并重新计算宽度
        const target = this.formatter.currentSpec.getTargetElement();
        const innerWidth = this.formatter.quill.root.clientWidth - 30;
        button.addEventListener("click", function () {
            if (_this.mode === "%") {
                _this.mode = "px";
                target.setAttribute("width", target.width);
                target.removeAttribute("pw");
            }
            else {
                _this.mode = "%";
                const w = `${Math.min(Math.round((target.width * 10000) / innerWidth) / 100, 100)}%`;
                target.setAttribute("width", w);
                target.setAttribute("pw", w);
            }
            span.innerHTML = _this.getSizeInfo();
        });
        div.appendChild(span);
        div.appendChild(button);
        span.innerHTML = this.getSizeInfo();
        return [div, span];
    }
    onUpdate() {
        super.onUpdate();
        this.sizeInfo.innerHTML = this.getSizeInfo();
    }
    onCreate() {
        super.onCreate();
        this.formatter.overlay.appendChild(this.sizeInfoPanel);
    }
    onDestroy() {
        super.onDestroy();
        this.formatter.overlay.removeChild(this.sizeInfoPanel);
        // this.ele;
    }
    getInitMode() {
        const target = this.formatter.currentSpec.getTargetElement();
        if ((target.getAttribute("width") || "").indexOf("%") > -1) {
            return "%";
        }
        return "px";
    }
    getSizeInfo() {
        const target = this.formatter.currentSpec.getTargetElement();
        if (this.mode === "px") {
            target.removeAttribute("pw");
            return `${target.getAttribute("width") || target.width} ×  ${target.height}`;
        }
        else {
            return `${target.getAttribute("width")}`;
        }
    }
}
class CustomImageSpec extends ImageSpec {
    getActions() {
        return [ResizeWidthAction, AlignAction, DeleteAction];
    }
}
export { CustomImageSpec };
