import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import headerBackground from "./assets/headerBackground.png";
import hero from "./assets/backMan.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Land = () => {
  return (
    <>
      <Navbar />
      <Box
        // mt={12}
        px={{ base: "20px", md: "20px", lg: "60px", xl: "60px", "2xl": "20vw" }}
        height={{
          base: "80%",
          md: "100%",
          lg: "100%",
          xl: "100%",
          "2xl": "100%",
        }}
        style={{
          backgroundImage: `url(${headerBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          marginTop: "-75px",
          marginBottom: "32px",
          paddingTop: "150px",
          zIndex: -1,
        }}
      >
        <Flex
          align="center"
          direction={{
            base: "column",
            md: "column",
            lg: "row",
            xl: "row",
            "2xl": "row",
          }}
          flexWrap="no-wrap"
          marginTop={0}
          // as={motion.div}
        >
          <Box flex={1} marginTop={0}>
            <Heading
              color="brand.100"
              size={{ base: "2xl", md: "2xl", lg: "2xl" }}
              sx={{
                fontWeight: "900",
                lineHeight: "67px",
              }}
              marginBottom={{ base: "26px", md: "26px", lg: "26px" }}
              as={motion.div}
              whileHover={{ scale: 1.1 }}
            >
              The Decentralized Exchange
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "md" }}
              fontWeight={400}
              sx={{
                lineHeight: "25.89px",
              }}
              marginBottom={{ base: "48px", md: "48px", lg: "48px" }}
            >
              Trade with over 20+ different cryptocurrency and fiat currency
              pairs, including Ethereum, Fantom and BNB pairs.
            </Text>

            <Flex
              flex-wrap="wrap"
              direction={{ base: "column", md: "row", lg: "row", xl: "row" }}
              justifyContent="flex-start"
              gap="20px"
              marginTop={0}
            >
              <Link to="/home">
                <Button
                  color={"white"}
                  bgColor="#f8087b"
                  _hover={{
                    background: "#492067",
                    color: "white",
                  }}
                  boxShadow="base"
                  p="6"
                  rounded="md"
                  border={1}
                  onClick={() => {}}
                >
                  Start Trading
                </Button>
              </Link>
            </Flex>
          </Box>
          <Spacer flex={0.4} />
          <Box
            mt={0}
            display={{
              base: "block",
              md: "block",
              lg: "block",
              xl: "block",
              "2xl": "block",
            }}
            flex={1.8}
            as={motion.div}
            // whileHover={{ scale: 1.1, rotate: 0 }}
            zIndex={15}
          >
            <Image src={hero} alt="hero's png" />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Land;
