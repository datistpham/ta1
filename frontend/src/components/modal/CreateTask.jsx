import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Avatar, Tooltip } from "antd";
import { Dropdown, Space, Typography, Input } from "antd";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import { createTask } from "../../api";
const { Option } = Select;
const CreateTask = ({ isModalCreateOpen, setIsModalCreateOpen , workspaceCurrent, setChange }) => {
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [title, setTitle]= useState(null)
  const [workspace, setWorkspace] = useState(workspaceCurrent);
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus]= useState("")
  const [deadline, setDeadline] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(1);
  const { TextArea } = Input;
  var count = 0;

  const showModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleOk = async () => {
    const calendarEvent = {
      title: title,
      description,
      priority: priority,
      startTime: startTime,
      endTime: endTime,
      // id: selectedEvent ? selectedEvent.id : Date.now(),
      workspace: workspaceCurrent.id,
      timeRemaining: timeRemaining,
      status: status,
      deadline: deadline,
      assignee,
      // status

    };
    const result= await createTask(calendarEvent)
    setChange(prev=> !prev)
    console.log(result)
    setIsModalCreateOpen(false);
  };

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const handleEdit = (index) => {
    setIsClickEdit(true);
    count++;
    console.log(count);
    if (count % 2 === 0) {
      setIsClickEdit(false);
    } else {
      setIsClickEdit(true);
    }
  };
  const handleReturn = (index) => {
    setIsModalCreateOpen(false);
  };
  const handleChangePrio = (value) => {
    setPriority(value);
  };
  const handleChangeStatus= (value)=> {
    setStatus(value)
  }
  const handleChangeDeadline = (date) => {
    setDeadline(date);
  };
  const handleChangeSt = (date) => {
    setStartTime(date);
  };
  const handleChangeEnd = (date) => {
    setEndTime(date);
  };
  return (
    <div>
      <Modal
        title="TASK DETAIL"
        open={isModalCreateOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="Return"
            onClick={handleReturn}
            className="bg-red-600 text-white"
          >
            Return
          </Button>,
          <Button
            key="save"
            onClick={handleOk}
            className="bg-blue-600 text-white"
          >
            {isClickEdit ? "Update" : "Ok"}
          </Button>,
        ]}
      >
        <div className="grid grid-cols-2 ">
          <div className="">
            <div className="font-bold">Description</div>
            <TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              style={{ width: '300px', height: '200px'}}
            />
          </div>
          <div className="">
            <span className={`p-2 rounded-md text-white bg-gray-600`}>
              必要
            </span>
            <div className="grid grid-cols-2 text-black">
              <div className="" style={{ lineHeight: "30px" }}>
                <div className="m-1 mt-4">作業領域</div>
                <div className="m-1">Title</div>
                <div className="m-1">Assignee</div>
                <div className="m-1">Priority</div>
                <div className="m-1">Status</div>
                <div className="m-1">Deadline</div>
                <div className="m-1"> Time remaining</div>
                <div className="m-1"> Start time</div>
                <div className="m-1">End time</div>
              </div>
              <div>
                <div style={{ lineHeight: "35px" }}>
                  <input
                    type="text"
                    value={workspace.name}
                    autoFocus
                    className="m-1 mt-4 w-28 h-2"
                  />
                  <input
                    type="text"
                    className="m-1 w-28 h-2"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                  />
                  <input
                    type="text"
                    className="m-1 w-28 h-2"
                    onChange={(e) => {
                      setAssignee(e.target.value);
                    }}
                    value={assignee}
                  />
                  <Select
                    value={priority}
                    className="ml-1"
                    onChange={handleChangePrio}
                    style={{ width: "110px" }}
                  >
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                  <Select
                    value={status}
                    className="ml-1"
                    onChange={handleChangeStatus}
                    style={{ width: "110px" }}
                  >
                    <Option value="To Do">To Do</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Done">Done</Option>
                  </Select>
                  <DatePicker
                    selected={deadline}
                    onChange={handleChangeDeadline}
                    className=" w-28 h-2 m-1"
                  />
                  <input
                    type="text"
                    className="m-1 w-28 h-2"
                    value={timeRemaining}
                  />
                  <DatePicker
                    selected={startTime}
                    onChange={handleChangeSt}
                    className=" w-28 h-2 m-1"
                  />
                  <DatePicker
                    selected={endTime}
                    onChange={handleChangeEnd}
                    className=" w-28 h-2 m-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTask;
