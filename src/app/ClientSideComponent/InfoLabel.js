import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { ListItem, List, ListIcon } from "@chakra-ui/react";
import { IoMdInformationCircle } from "react-icons/io";

export default function InfoLabel() {
  return (
    <Popover boundary={"scrollParent"}>
      <PopoverTrigger>
        <Button className="w-[fit-content] relative bottom-[12px] left-[17px] bg-[white] cursor-pointer ">
          <IoMdInformationCircle size={23} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg="#48aae6"
        color="white"
        className="relative right-[47px]"
      >
        <PopoverHeader fontWeight="semibold"> How to add label ?</PopoverHeader>
        <PopoverArrow bg="pink.500" />
        <PopoverCloseButton bg="red.500" />
        <PopoverBody className="">
          <div className="mb-[20px] bg-[#48aae6]  rounded-[6px] text-[white] text-[22px] font-dhurjati font-normal">
            <List>
              <ListItem className="">
                <ListIcon
                  as={IoMdInformationCircle}
                  color="#0b4f79"
                  className="relative mb-[5px]"
                />{" "}
                Type the label name.
              </ListItem>
              <ListItem>
                <ListIcon
                  as={IoMdInformationCircle}
                  color="#0b4f79"
                  className="relative mb-[5px]"
                />{" "}
                Tap the "+" button.
              </ListItem>{" "}
              <ListItem>
                <ListIcon
                  as={IoMdInformationCircle}
                  color="#0b4f79"
                  className="relative mb-[5px]"
                />
                See the added label.
              </ListItem>
              <ListItem>
                <ListIcon
                  as={IoMdInformationCircle}
                  color="#0b4f79"
                  className="relative mb-[5px]"
                />{" "}
                Repeat to add mutiple labels.
              </ListItem>
            </List>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
