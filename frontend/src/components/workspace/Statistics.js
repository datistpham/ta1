import React from "react";
import MultiColorProgressBar from "../progress-bar/index";
const 統計 = ({ workspace, userList }) => {
  const readings = [
    {
      name: "完了",
      value: 16,
      color: "green",
    },
    {
      name: "発展中",
      value: 70,
      color: "#EFCD1A",
    },
    {
      name: "遅く",
      value: 14,
      color: "red",
    },
  ];
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {workspace.user.map((workspaceUser) => (
        <div style={{marginRight: '10%', marginBottom: '20px',width:"150px"}}>
          <MultiColorProgressBar  key={workspaceUser.id} readings={readings} workspaceUser={workspaceUser} userList={userList} />
        </div>
      ))}
    </div>
  );
};

export default 統計;
