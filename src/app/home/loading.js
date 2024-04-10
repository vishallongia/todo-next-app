import React from "react";
import { Skeleton, Stack, Box } from "@chakra-ui/react";
export default function Loading() {
  return (
    <>
      <Skeleton className="min-h-[250px] mt-[40px] mx-[15px] rounded-md"></Skeleton>

      <Skeleton className="min-h-[80px] mt-[60px] mx-[15px] rounded-md"></Skeleton>

      <Box boxShadow="lg" bg="white" className="mx-[15px] mt-[30px]">
        <Stack>
          <Skeleton height="75px" className="rounded-md" />
          <Skeleton height="75px" className="rounded-md" />
          <Skeleton height="75px" className="rounded-md" />
          <Skeleton height="75px" className="rounded-md" />
          <Skeleton height="75px" className="rounded-md" />
        </Stack>
      </Box>
    </>
  );
}
