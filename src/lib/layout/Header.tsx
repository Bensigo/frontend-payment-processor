import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import { useAuth } from "../shared/context/auth-provider";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      width="full"
    >
      <Heading as="h1" size="md">
        <Link href="/">Loowi</Link>
      </Heading>
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
