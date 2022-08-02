import {
  Box,
  Button,
  Flex,
  Skeleton,
  Stack,
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Moment from "moment";
import Link from "next/link";
import { FaPlus } from "react-icons/all";

import useListPaymentLink from "../application/list-payment-link.hooks";

import SidebarWithHeader from "./base";
import CreatePaymentLink from "./components/create-payment-link";

const PaymentLinks = () => {
  const { isLoading, data, refetch, isError } = useListPaymentLink();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <SidebarWithHeader>
      <Box mt={8}>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl">Payment Links</Text>
          <Button
            leftIcon={<FaPlus />}
            onClick={onOpen}
            color="white"
            bg={useColorModeValue("blackAlpha.900", "green.500")}
          >
            Create Link
          </Button>
          <CreatePaymentLink isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>
      <TableContainer mt={4}>
        <Table variant="simple">
          <TableCaption> </TableCaption>
          <Thead>
            <Tr bg={useColorModeValue("gray.100", "green.500")}>
              <Th>Title</Th>
              <Th>Amount(USD)</Th>
              <Th>Payment Type</Th>
              <Th>created At</Th>
              <Th>Active</Th>
              <Th>Paymnet link</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
            {data.map((payment) => (
              <Tr>
                <Td fontSize="sm">{payment.title}</Td>
                <Td fontSize="sm">
                  {moneyFormatter.format(Number(payment.amount))}
                </Td>
                <Td fontSize="sm">{payment.paymentType}</Td>
                <Td fontSize="sm">
                  {Moment(payment.createdAt).format("MMM Do YY, h:mm:ss a")}
                </Td>
                <Td fontSize="sm">
                  <Switch isChecked={payment.isActive} />
                </Td>
                <Td fontSize="sm">
                  <Link href="#">view link</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
};

export default PaymentLinks;
