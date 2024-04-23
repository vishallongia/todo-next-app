"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { updateTask } from "../../../services/TaskService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { UseAppContext } from "./Context";

export default function IsTaskCheckedModal({
  setShowIsTaskCheckedPopup,
  showIsTaskCheckedPopup,
  id,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user, setUser } = UseAppContext();

  const handleUpdateTaskFn = async () => {
    const response = await updateTask({ taskId: id });
    const { redirection, success } = UIErrorHandler(response);
    if (redirection && !success) {
      router.push(redirection);
    }
    if (success) {
      setShowIsTaskCheckedPopup(false);
      setUser((prevUser) => ({
        ...prevUser,
        completedTask: prevUser.completedTask + 1,
      })); // Update totalTasks in user state
      router.refresh();
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={showIsTaskCheckedPopup ? onOpen : onClose}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
        size={"sm"}
        returnFocusOnClose={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={() => {
                  setShowIsTaskCheckedPopup(false);
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleUpdateTaskFn} ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
