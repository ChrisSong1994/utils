import "./App.css";

import { copyToClipboard } from "@fett/utils";

// @ts-ignore
import ReactLogo from "./assets/react.svg?component";
// @ts-ignore
import styles from "./index.module.css";
const App = () => {
  return (
    <div className="content">
      <div style={{ margin: "12px auto;" }}>
        <ReactLogo style={{ width: "100px", height: "100px" }} />
        <h1 className={styles.title}>@fett/quick-cli with React</h1>
        <button style={{ width: 100 }} onClick={() => copyToClipboard("hello world!")}>
          拷贝数据
        </button>
      </div>
    </div>
  );
};

export default App;
