import { WeeksGrid } from "./components/WeeksGrid";
import './Nav.css'
import { TableIndicators } from "./components/TableIndicators";
import { useState } from "react";
import { WeeksPage } from "./components/WeeksPage";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { GraphicByWeeks } from "./components/GraphicByWeeks";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link className="Nav" to='/'>Главная</Link>
          </li>
          <li>
            <Link className="Nav" to='/table'>Таблица</Link>
          </li>
          <li>
            <Link className="Nav" to='/graphic'>График</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path='/graphic' element={<WeeksPage />}>
          </Route>
          <Route path='/table' element={<TableIndicators />}>
          </Route>
          {/* 50vw */}
          <Route path='/' element={<GraphicByWeeks width={1280} height={250} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
