"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";

export default function TodayTaskSlider({ todayTasksData }) {
  const [todayTasks, setTodayTasks] = useState(todayTasksData.todayTasks || []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    if (todayTasksData.todayTasks && todayTasksData.todayTasks.length > 0) {
      const updatedTodayTasks = todayTasksData.todayTasks.map((task) => ({
        _id: task._id,
        title: task.title,
        description: task.description,
      }));
      setTodayTasks(updatedTodayTasks);
    } else {
      setTodayTasks([
        {
          _id: "0",
          title: "Zero Tasks, Full Relaxation For Today",
          description: "No tasks today! Take a break and enjoy a peaceful day.",
        },
      ]);
    }
  }, [todayTasksData.todayTasks]);

  const productTemplate = (task) => {
    return (
      <div>
        <Card
          title={task.title}
          className="bg-[#0b4f79] text-[snow] shadow-md shadow-[black]"
        >
          <p className="m-0">{task.description}</p>
        </Card>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={todayTasks}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        circular={true}
        autoplayInterval={3000}
      />
    </div>
  );
}
