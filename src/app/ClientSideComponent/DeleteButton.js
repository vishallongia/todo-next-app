"use client";
import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import DeleteTaskModal from "./DeleteTaskModal";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowDeletePopup(true);
        }}
      >
        {" "}
        <MdDelete size={30} />
      </button>
      {showDeletePopup && (
        <DeleteTaskModal
          showDeletePopup={showDeletePopup}
          setShowDeletePopup={setShowDeletePopup}
          id={id}
        />
      )}
    </>
  );
}
