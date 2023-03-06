import React from "react";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GiBodySwapping } from "react-icons/gi";

const Navbar = () => {
  return (
    <Box
      as="nav"
      align="center"
      display={"flex"}
      justifyContent="space-around"
      textAlign={"center"}
      alignContent={"center"}
      mb={0}
      wrap="wrap"
      padding="1rem"
      bg="gray.100"
      color="black"
    >
      <Flex align="center" mr={5}>
        <div className="appName">
          <Box display={"flex"} alignItems={"center"}>
            DEXSTER
          </Box>
        </div>
        <GiBodySwapping className="appnameIcon" />
      </Flex>

      <Spacer />
      <Box>
        <Link to="/home">
          <Button
            color={"white"}
            bgColor="#f8087b"
            _hover={{
              background: "#492067",
              color: "white",
            }}
            width={"220px"}
            variant="solid"
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
