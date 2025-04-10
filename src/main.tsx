import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "reset-css";
import Cloud from "leancloud-storage";
import App from "./App.tsx";
import { initRem } from "./utils/rem";
initRem(); //rem适配

// leanCloud的SDK初始化，让SDK知道往哪里存文件
Cloud.init({
  appId: "JdIMW4DdKVBPUgJ6xhZBqVLG-gzGzoHsz",
  appKey: "ECrANK5WsVTbHGCHd2wKLp1M",
  serverURL: "https://jdimw4dd.lc-cn-n1-shared.com",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
