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
import { deleteTask } from "../../../services/TaskService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { UseAppContext } from "./Context";

export default function DeleteTaskModal({
  showDeletePopup,
  setShowDeletePopup,
  id,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const router = useRouter();
  const { user, setUser } = UseAppContext();

  const deleteTaskFn = async () => {
    const payload = { deleteTaskId: [id] };
    const response = await deleteTask(payload);
    const { redirection, success } = UIErrorHandler(response);
    if (redirection && !success) {
      router.push(redirection);
    }
    if (success) {
      setShowDeletePopup(false);

      setUser((prevUser) => ({
        ...prevUser,
        totalTasks: prevUser.totalTasks - 1,
      })); // Update totalTasks in user state
      router.refresh();
    }
    router.refresh();
  };

  return (
    <>
      <AlertDialog
        isOpen={showDeletePopup ? onOpen : onClose}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
        size={"sm"}
        returnFocusOnClose={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setShowDeletePopup(false);
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteTaskFn} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
