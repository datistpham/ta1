import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Avatar, Tooltip } from "antd";
import { Dropdown, Space, Typography } from "antd";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import { deleteTask, updateTask } from "../../api";
import moment from "moment"

const { Option } = Select;
const TaskDetail = ({
  isModalDetailVisible,
  task,
  userList,
  setIsModalDetailVisible,
  setChange,
  isClickDetail,
  setIsClickDetail
}) => {
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [title, setTitle]= useState(task?.title)
  const [workspace, setWorkspace] = useState(task?.workspace);
  const [assignee, setAssignee] = useState(task?.assignee);
  const [priority, setPriority] = useState(task?.priority);
  const [deadline, setDeadline] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  var count = 0;

  const getUserWithID = (userId) => {
    const user = userList.find((user) => user.id === userId);
    return user;
  };

  const showModal = () => {
    setIsModalDetailVisible(true);
  };

  const handleOk = async () => {
    setIsModalDetailVisible(false);
    if (isClickEdit) {
      const calendarEvent = {
        title: title,
        assignee: assignee,
        description: task.description,
        priority: priority,
        startTime: startTime,
        endTime: endTime,

        // id: selectedEvent ? selectedEvent.id : Date.now(),
        workspace: workspace,
        timeRemaining: 1,
        status: "To Do",
        deadline: deadline,
        taskId: task._id
      };
      const result = await updateTask(calendarEvent);
      setChange(prev=> !prev)
      console.log(result);
    }
  };

  const handleCancel = () => {
    setIsModalDetailVisible(false);
  };

  const handleEdit = (index) => {
    setIsClickEdit(true);
    count++;
    console.log(count);
    if (count % 2 === 0) {
      setIsClickDetail(true)
      setIsClickEdit(false);
    } else {
      setIsClickDetail(false)
      setIsClickEdit(true);
    }
  };
  const handleDelete = async (index) => {
    setIsModalDetailVisible(false);
    const result= await deleteTask({taskId: task._id})
    setChange(prev=> !prev)
    console.log(result)
  };
  const handleChangePrio = (value) => {
    setPriority(value);
  };
  const handleChangeDeadline = (date) => {
    setDeadline(date);
  };
  const handleChangeSt = (date) => {
    setStartTime(date);
  };
  const handleChangeEnd = (date) => {
    setEndTime(date);
  };
  useEffect(() => {
    if (isClickEdit) {
      setTitle(task.title)
      setWorkspace(task.workspace);
      setAssignee(task.assignee);
      setDeadline(new Date(task.deadline));
      setStartTime(new Date(task.starting_time));
      setEndTime(new Date(task.end_time));
    }
    else if(isClickDetail) {
      setTitle(task.title)
      setWorkspace(task.workspace);
      setAssignee(task.assignee);
      setDeadline((task.deadline));
      setStartTime((task.starting_time));
      setEndTime((task.end_time));
    }
    else {
      setTitle(null)
      setWorkspace(null);
      setAssignee(null);
      setDeadline(null);
      setStartTime(null);
      setEndTime(null);
    }
    return ()=> {
      setTitle(null)
      setWorkspace(null);
      setAssignee(null);
      setDeadline(null);
      setStartTime(null);
      setEndTime(null);
    }
  }, [isClickEdit, task, isClickDetail]);
  return (
    <div>
      <Modal
        title="TASK DETAIL"
        open={isModalDetailVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="delete"
            onClick={handleDelete}
            className="bg-red-600 text-white"
          >
            Delete
          </Button>,
          <Button
            key="edit"
            onClick={handleEdit}
            className="bg-zinc-600 text-white"
          >
            Edit
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
            <div className="text-gray-400">{task?.description}</div>
          </div>
          <div className="">
            <span
              className={`p-2 rounded-md text-white ${
                task?.status === "Done"
                  ? "bg-green-600"
                  : task?.status === "In Progress"
                  ? "bg-blue-600"
                  : "bg-gray-600"
              }`}
            >
              {task?.status}
            </span>
            <div className="grid grid-cols-2 text-black">
              <div className="" style={{ lineHeight: "30px" }}>
                <div className="m-1 mt-4">作業領域</div>
                <div className="m-1">Assignee</div>
                <div className="m-1">Priority</div>
                <div className="m-1">Deadline</div>
                <div className="m-1"> Time remaining</div>
                <div className="m-1"> Start time</div>
                <div className="m-1">End time</div>
              </div>
              <div>
                {isClickEdit ? (
                  <div>
                    <input
                      readOnly
                      type="text"
                      value={workspace}
                      onChange={(e) => {
                        setWorkspace(e.target.value);
                      }}
                      // onBlur={()=>{setIsClickEdit(false)}}
                      autoFocus
                      className="m-1 mt-6 w-28 h-2"
                    />
                    <input
                      type="text"
                      className="m-1 w-28 h-2 mt-2"
                      onChange={(e) => {
                        setAssignee(e.target.value);
                      }}
                      value={assignee}
                    />
                    <Select
                      value={priority}
                      className="ml-1 mt-2"
                      onChange={handleChangePrio}
                    >
                      <Option value="High">High</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Low">Low</Option>
                    </Select>
                    <DatePicker
                      selected={new Date(deadline)}
                      onChange={handleChangeDeadline}
                      className="mt-2 w-28 h-2 m-1"
                    />
                    <input
                      type="text"
                      className="m-1 w-28 h-2 mt-4"
                      value={task?.timeRemaining}
                    />
                    <DatePicker
                      selected={new Date(startTime)}
                      onChange={handleChangeSt}
                      className=" w-28 h-2 m-1 mt-2"
                    />
                    <DatePicker
                      selected={new Date(endTime)}
                      onChange={handleChangeEnd}
                      className=" w-28 h-2 m-1 mt-2"
                    />
                  </div>
                ) : (
                  <div style={{ width: "200px", lineHeight: "29px" }}>
                    <div className="m-1 mt-4">{task?.workspace || ""}</div>
                    <div className="m-1">
                      {userList?.filter(item=> assignee?.split(",").includes(item?.name.trim())).map((user) => (
                        <Tooltip
                          key={user.id}
                          title={getUserWithID(user.id).name + " ( " + user.role + " )"}
                          placement="top"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <Avatar src={getUserWithID(user.id).avatar} />
                        </Tooltip>
                      )) || ""}
                    </div>
                    <div className="m-1">{priority || ""}</div>
                    <div className="m-1">{moment(deadline)?.format("DD-MM-YYY") || ""} </div>
                    <div className="m-1"> {task?.timeRemaining || ""}</div>
                    <div className="m-1">{moment(startTime).format("DD-MM-YYY") || ""}</div>
                    <div className="m-1">{moment(endTime).format("DD-MM-YYY") || ""}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDetail;
