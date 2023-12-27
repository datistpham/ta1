import React, { useContext, useEffect, useState } from "react";
import Day from "./Day";
import { getTask } from "../../../api";
import { EventModal2 } from "./EventModal2";
import GlobalContext from "./context/GlobalContext";

export default function Month({ month }) {
  const {setChange, change }=  useContext(GlobalContext)
  const [change2, setChange2]= useState(false)
  const [edit, setEdit] = useState(false);
  const [_id, set_Id]= useState()
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getTask({ datetime: new Date() });
      console.log("result", result);
      setTasks(result);
    })();
  }, [change, change2]);

  // Tạo một mảng chứa các ngày từ đầu tháng đến cuối tháng hiện tại
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  for (
    let day = firstDayOfMonth;
    day <= lastDayOfMonth;
    day.setDate(day.getDate() + 1)
  ) {
    daysInMonth.push(new Date(day));
  }

  // Tạo một mảng chứa công việc cho mỗi ngày trong tháng
  const groupedTasks = daysInMonth.map((day) => {
    // Lọc các công việc thuộc ngày hiện tại
    const tasksForDay = tasks.filter((task) => {
      const startingTime = new Date(parseInt(task.starting_time));
      return startingTime.toDateString() === day.toDateString();
    });

    // Thêm trường timeCurrent là ngày của mảng đó
    return { timeCurrent: day, tasks: tasksForDay };
  });

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day _id={_id} set_Id={set_Id} setEdit={setEdit} edit={edit} data={groupedTasks} day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
      {/* {groupedTasks.map((row, i) => (
        <React.Fragment key={i}>
          <Day day={row} key={i} rowIdx={i} />
        </React.Fragment>
      ))} */}
      {edit && <EventModal2 setChange={setChange2} setEdit={setEdit} _id={_id} />}
    </div>
  );
}
