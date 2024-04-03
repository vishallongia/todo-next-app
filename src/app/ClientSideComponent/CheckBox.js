import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import { updateTask } from "../../../services/TaskService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";


export default function CheckBox({ id }) {
  const router = useRouter();
  const handleUpdateTask = async (isChecked) => {
    if (isChecked) {
      const response = await updateTask({ taskId: id });
      const { redirection, success } = UIErrorHandler(response);
      if (redirection && !success) {
        router.push(redirection);
      }
      if (success) {
        router.refresh();
      }
    }
  };

  return (
    <div className="checkbox-wrapper-19 relative top-[3px]">
      <input
        id={id}
        type="checkbox"
        onChange={(e) => {
          handleUpdateTask(e.target.checked);
        }}
      />
      <label className="check-box" htmlFor={id}></label>
    </div>
  );
}
