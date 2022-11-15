import React, { useRef } from "react";
import QuilluQ from "./page/demo1";
import "quill/dist/quill.snow.css";
import "./App.css";
import "antd/dist/antd.css";
function App() {
  const quillRef = useRef(null);
  return (<div className="App">
    <button onClick={() => {
      console.info(quillRef);
      console.log('<<<<< <<<<<<  华丽的分隔符');
      console.info(quillRef.current?.getContent());
    }}>
      getContent
    </button>
    <button onClick={() => {
      quillRef.current?.setContent('<p><img width="25%" style="display: inline; float: left; margin: 0px 1em 1em 0px;" src="https://t9.baidu.com/it/u=3725841446,2955765607&amp;fm=218&amp;app=92&amp;f=PNG?w=121&amp;h=75&amp;s=A50022F15C1338C000B59121030010C0" width="100%"></img></p><p>dasdsa</p><p style="padding-left:3em">sa</p><p style="padding-left:3em">d</p><p style="padding-left:3em">as</p><p style="padding-left:3em">das</p><p style="padding-left:3em">dasfgrsgfdgsfdg</p>');
    }}>
      setContent
    </button>
    <QuilluQ id="dasdsa" ref={quillRef}/>
  </div>);
}
export default App;
