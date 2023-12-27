import React, { useState } from "react";
import { Avatar } from "antd";
import "./profileDropDown.scss";
import {
  LogoutOutlined,
  ProfileOutlined,
  SettingFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export const ProfileDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  console.log(isMenuOpen);
  return (
    <div className="avatar-container">
      <span className="avatar">
        <Avatar
          src={
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          }
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </span>
      {isMenuOpen && (
        <div className="flex flex-col dropdown-menu">
          <ul className="flex flex-col ">
            <li onClick={() => navigate("/profile")}>
              <ProfileOutlined />
              <p>プロフィル</p>
            </li>
            <li>
              <SettingFilled />
              <p>セッティング</p>
            </li>
            <li>
              <QuestionCircleOutlined />
              <p>サポート</p>
            </li>
            <li onClick={()=>navigate("/login")}>
              <LogoutOutlined />
              <p>ログアウト</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
