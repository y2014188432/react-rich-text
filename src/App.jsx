import React, { useRef,useEffect } from "react";
import Quill from "./page/demo1";
import "quill/dist/quill.snow.css";
import "./App.css";
import "antd/dist/antd.css";
function App() {

  useEffect(() => {
    quillRef.current?.setContent('<p>请输入内容......</p>');
  },[])

  const quillRef = useRef(null);
  return (<div className="App">
    <button onClick={() => {
      // 富文本内容，以 HTML 标签存储、单行字符串、可直接渲染至页面
      console.info(quillRef.current?.getContent());
    }}>
      获取富文本内信息
    </button>
    <button onClick={() => {
      quillRef.current?.setContent('<p>请输入内容......</p>');
    }}>
      重置富文本信息
    </button>
    {/* id 作用未知，但不可为空 */}
    <Quill id="abc" ref={quillRef}/>
  </div>);
}
export default App;
