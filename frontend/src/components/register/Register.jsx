import React, { useState } from "react";
import "./register.css";
import logo from "./logo.png";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../../api";
const 登録 = () => {
  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [pwd, setPwd]= useState("")

  const navigate = useNavigate()
  return (
    <div className="section">
      <div className="container1">
        <div className="signup-form">
          <div className="logo-container1">
            <img src={logo} alt="" />
            <h1 className="h1" style={{fontWeight:"bold"}}>Xiuu</h1>
          </div>

          <form onSubmit={async (e)=> {
            e.preventDefault()
            try {
              const result= await signupApi({name, pwd, email})
              console.log(result)
              navigate("/login")
            }
            catch(e) {
              alert("Đăng ký thất bại, Vui lòng thử lại")
              console.log(e)
            }
          }}>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder=" フルネーム" />
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder=" ユーザーネーム" />
            <input value={pwd} onChange={(e)=> setPwd(e.target.value)} type="password" placeholder=" パスワード" />
            <input type="password" placeholder=" パスワードを認証" />
            <input o type="submit" value="登録" />
          </form>
          <a class="question">すでにアカウントをお持ちですか？</a>
          <a onClick={(e)=>navigate("/login")} style={{cursor:"pointer"}}> ログイン</a>
        </div>
      </div>
    </div>
  );
};

export default 登録;
