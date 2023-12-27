import React, { useState } from 'react'
import * as data from "../sample-data"
import axios from "axios"


const baseURL = "http://localhost:4000/api/v1"
var accessToken = ""
const getTaskList = () => {
  return data.TASK_LIST
}

const getWorkspaceList = () => {
  return data.WORKSPACE_LIST
}

const getUserList = () => {
  return data.USER_LIST
}

const getGroupList = () => {
  return data.GROUP_LIST
}

const handleLogin = async (username, password) => {
  const response = await (fetch('http://localhost:4000/api/v1/auth/login'), {
    "method": "POST",
    "headers": {
      "Content-Type": 'application/json'
    },

    body: JSON.stringify({
      "email": username,
      "pwd": password
    }),
  });
  console.log(response);
  console.log(response.json);
  const data = await response.json;

  if (response.accessToken) {
    accessToken = data.accessToken
  }
}

const createTask= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/workspaces/task/create",
    method: "post",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    data: {
      ...data,
      userId: 1
    }
  })
  const result= await res.data
  return result
}

const updateTask= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/workspaces/task/update",
    method: "post",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    data: {
      ...data,
    }
  })
  const result= await res.data
  return result
}

const loginApi= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/auth/login",
    method: "post",
    data: {
      ...data,
    }
  })
  const result= await res.data
  return result
}

const signupApi= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/auth/signup",
    method: "post",
    data: {
      ...data,
    }
  })
  const result= await res.data
  return result
}

const getTask= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/dashboard/calendar",
    method: "get",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    params: {
      ...data
    },
  })
  const result= await res.data
  return result
}

const deleteTask= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/workspaces/task/delete",
    method: "post",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    data: {
      ...data,
      // userId: 1
    }
  })
  const result= await res.data
  return result
}

const createTaskWorkSpace= async (data)=> {
  const res= await axios({
    url: "http://localhost:4000/api/v1/workspaces/task/create",
    method: "post",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    data: {
      ...data,
      userId: 1
    }
  })
  const result= await res.data
  return result
}

export { getGroupList, getUserList, getWorkspaceList, getTaskList, handleLogin, createTask, loginApi, signupApi, getTask, updateTask, deleteTask}