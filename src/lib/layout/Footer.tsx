import { Flex, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Box>
        {new Date().getFullYear()} - <Text>Loowi</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
