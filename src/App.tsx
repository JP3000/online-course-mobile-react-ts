import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Today from "./views/today";
import Explore from "./views/explore";
import Mine from "./views/mine";
import Detail from "./views/detail";
import TestZustand from "./views/zustand";
import Login from "./views/login";
import Main from "./views/main";
import Collect from "./views/collect";
import Guard from "./guard";
import AudioPlay from "./components/player";
import Bubble from "./components/bubble";
import { usePlayerStore } from "./store/player";

function App() {
  const { bubbleShow } = usePlayerStore((state) => state);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/today" element={<Today />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/mine" element={<Mine />}></Route>
          </Route>

          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/zustand" element={<TestZustand />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="mine/collect"
            element={
              <Guard>
                <Collect />
              </Guard>
            }
          ></Route>
        </Routes>
        <AudioPlay />
        {bubbleShow ? <Bubble /> : ""}
      </div>
    </BrowserRouter>
  );
}

export default App;
