"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Button } from "@chakra-ui/react";
import { UseAppContext } from "./Context";

export default function FilterData() {
  const { user, setUser } = UseAppContext();
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [selectedCities, setSelectedCities] = useState(null);

  const cities =
    user &&
    user.label.map((label) => {
      return { name: label, code: label };
    });

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visibleBottom}
        position="bottom"
        onHide={() => setVisibleBottom(false)}
        className="h-[60%]    bg-gradient-to-r from-[#0b4f79] to-slate-800"
      >
        <div className="flex items-center gap-[5px] mb-[25px]">
          <FaFilter color="snow" size={20} />
          <h2 className="text-[snow] text-lg font-semibold">Filters</h2>
        </div>
        <div className=" mb-[30px]">
          <InputText
            type="text"
            placeholder="Enter Task title"
            className="w-[100%] py-[12px] rounded-md"
          />
        </div>
        <div className="card flex justify-content-center mb-[25px]">
          <MultiSelect
            value={selectedCities}
            onChange={(e) => setSelectedCities(e.value)}
            options={cities}
            optionLabel="name"
            filter
            placeholder="Select Tag"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            leftIcon={<FaFilter size={16} />}
            className="bg-[#48aae6] w-[100%] text-[snow] py-[24px] text-[18px]"
            variant="solid"
          >
            Apply
          </Button>
        </div>
      </Sidebar>
      <FaSearch
        label="Search"
        onClick={() => setVisibleBottom(true)}
        size={23}
        color="snow"
      />
    </div>
  );
}
