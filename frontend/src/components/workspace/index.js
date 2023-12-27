import React, { useState } from "react";
import { Tabs, Space } from "antd";
import useStyleWorkspace from "./style";
import リスト from "./List";
import 看板 from "./Board";
import 資料 from "./Document";
import 統計 from "./Statistics";

const 作業領域 = ({ workspace, taskList, userList }) => {
  const [tab, setTab] = useState("list");
  const classes = useStyleWorkspace();
  const tabItems = [
    { label: "リスト", key: "list" },
    { label: "看板", key: "board" },
    { label: "資料", key: "document" },
    { label: "統計", key: "statistics" },
  ];

  const handleOnChange = (value) => {
    setTab(value);
  };

  return (
    <div className={classes.workspace}>
      <div className={classes.sidebar}>
        <div className={classes.workspaceName}>
          <Space>
            <img
              alt=""
              width={20}
              height={20}
              style={{ backgroundColor: "lightblue" }}
              src={workspace.avatar}
            />
            <span>{workspace.name}</span>
          </Space>
        </div>
        <Tabs
          tabBarStyle={{ width: "180px", marginLeft: "30px" }}
          tabPosition="left"
          items={tabItems}
          onChange={handleOnChange}
        />
      </div>
      <div className={classes.content}>
        {tab === "list" && <リスト workspace={workspace} taskList = {taskList} userList={userList} />}
        {tab === "board" && <看板 workspace={workspace} taskList={taskList} userList={userList} />}
        {tab === "document" && <資料 workspace={workspace} />}
        {tab === "statistics" && <統計 workspace={workspace} userList={userList} />}
      </div>
    </div>
  );
};

export default 作業領域;
