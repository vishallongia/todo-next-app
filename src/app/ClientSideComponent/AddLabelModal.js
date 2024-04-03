"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  InputRightElement,
  InputGroup,
  ListItem,
  List,
  ListIcon,
} from "@chakra-ui/react";
import InfoLabel from "../ClientSideComponent/InfoLabel";

import { TiPlus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { addNewLabel } from "../../../services/UserService";
import { UIErrorHandler } from "../../../utillis/UIErrorHandler";
import { useRouter } from "next/navigation";
import { UseAppContext } from "./context";

export function AddLabelModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addedLabel, setAddedLabel] = useState([]);
  const [labelText, setLabelText] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLabelExist, setIsLabelExist] = useState(false);
  const router = useRouter();
  const { user, setUser } = UseAppContext();

  const handleLabelTextFn = () => {
    if (labelText === "") {
      setShowError(true);
    } else if (user.label.includes(labelText)) {
      setIsLabelExist(true);
    } else if (
      user.label.some(
        (label) => label.toLowerCase() === labelText.toLowerCase()
      )
    ) {
      setIsLabelExist(true);
    } else if (addedLabel.includes(labelText)) {
      setIsLabelExist(true);
    } else if (
      addedLabel.some(
        (label) => label.toLowerCase() === labelText.toLowerCase()
      )
    ) {
      setIsLabelExist(true);
    } else {
      setShowError(false);
      setIsLabelExist(false);
      setAddedLabel((prevData) => [...prevData, labelText]);
      setLabelText("");
    }
  };

  const removeLabel = (addedLabelText) => {
    setAddedLabel(
      addedLabel.filter((labelText) => {
        return labelText !== addedLabelText;
      })
    );
  };

  const handleSubmitLabel = async () => {
    if (addedLabel.length === 0) {
      setShowError(addedLabel.length === 0);
    } else {
      const payload = { newLabel: addedLabel };
      const response = await addNewLabel(payload);
      const { redirection, success } = UIErrorHandler(response);

      if (redirection && !success) {
        router.push(redirection);
      }
      if (success) {
        onClose();
        setUser((prevUser) => ({
          ...prevUser,
          label: [...prevUser.label, ...addedLabel],
        }));
      }
      setAddedLabel([]);
    }
  };

  return (
    <>
      <button
        className=" flex items-center px-[22px]  text-[26px] text-[white] font-medium  rounded-lg   bg-[#48aae6] w-[fit-content] mr-[5px] font-dhurjati ml-[20px] mb-[10px]"
        onClick={onOpen}
      >
        <TiPlus /> Add Label
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setShowError(false);
          setAddedLabel([]);
          setIsLabelExist(false);
          setLabelText("");
        }}
        isCentered
        size={"xs"}
      >
        <ModalOverlay />
        <ModalContent>
          <div className="">
            <ModalHeader className="flex justify-evenly">
              Add New Label <InfoLabel />
            </ModalHeader>

            <ModalCloseButton />
          </div>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Label name</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter Label"
                  isInvalid={showError}
                  className={!showError && "border-[black]"}
                  value={labelText}
                  onChange={(e) => {
                    setLabelText(e.target.value);
                    setShowError(false);
                  }}
                  onBlur={() => {
                    if (labelText === "") {
                      setShowError(true);
                    }
                  }}
                />
                <InputRightElement>
                  <FaPlus
                    size={22}
                    onClick={handleLabelTextFn}
                    color={showError ? "#df4a4a" : ""}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {showError && (
              <p className="text-[#df4a4a] font-medium mt-[5px]">
                Please enter label
              </p>
            )}
            {isLabelExist && (
              <p className="text-[#df4a4a] font-medium mt-[5px]">
                Label already exist try with new label.
              </p>
            )}
            {addedLabel.length > 0 && (
              <FormControl mt={4}>
                <FormLabel>Added Label</FormLabel>
                <div
                  className={
                    "h-auto border-[black] border rounded-[6px] flex flex-wrap"
                  }
                >
                  {addedLabel &&
                    addedLabel.map((addedLabelText, index) => {
                      return (
                        <div
                          className="relative w-[fit-content] flex items-baseline"
                          key={addedLabelText}
                        >
                          <button
                            key={index} // Unique key prop for each button
                            className="pl-[14px] py-[4px] pr-[22px] rounded-[6px] w-[fit-content] mx-[8px] my-[6px] font-dhurjati bg-[#48aae6] text-white"
                          >
                            {addedLabelText}
                          </button>
                          <ImCross
                            className="absolute right-[14px] top-[10px] cursor-pointer"
                            size={10}
                            color="white"
                            onClick={() => {
                              removeLabel(addedLabelText);
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitLabel}>
              Add
            </Button>
            {addedLabel.length > 0 && (
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  setAddedLabel([]);
                }}
              >
                Clear All
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddLabelModal;
