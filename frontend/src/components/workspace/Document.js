import React from "react";
import { Space } from 'antd';
const 資料 = (props) => {
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: '10px' }}>
        <strong>ユーザーの要件</strong>
        <p style={{ fontSize: "17px" }}>
          なし。
        </p>
      </Space>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: '10px' }}>
        <strong>レポート</strong>
        <div>
          <a href="/">なし。</a>
        </div>
      </Space>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: '10px' }}>
        <strong>スライド</strong>
        <div>
          <a href="/">なし。</a>
        </div>
      </Space>
    </div>
  );
};

export default 資料;
