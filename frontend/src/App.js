import React from "react";
import { Route, Routes } from "react-router-dom";
import useStyleApp from "./style.js";
import ダッシュボード from "./components/dashboard/index.js";
import "./index.css";
import ContextWrapper from "./components/your-work/calendar/context/ContextWrapper.js";
import 登録 from "./components/register/Register.jsx";
import プロフィル from "./components/profile/Profile.jsx";
import ログイン from './components/login/login';

const App = (props) => {
  const classes = useStyleApp();

  return (
    <div className={classes.app}>
      <ContextWrapper>
        <Routes>
          <Route path="/" element={<ダッシュボード />} />
          <Route path="/register" element={<登録 />} />
          <Route path="/login" element={<ログイン />} />
          <Route path="/profile" element={<プロフィル />} />
        </Routes>
      </ContextWrapper>
    </div>
  );
};

export default App;
