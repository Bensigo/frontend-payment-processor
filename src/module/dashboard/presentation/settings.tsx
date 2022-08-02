import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
  useColorModeValue,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import type React from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/all";

import useDeleteAddressHook from "../application/delete-address.hook";
import getUserHook from "../application/get-user.hook";
import useListWallet from "../application/list-address.hook";
import useUpdateUsernameHook from "../application/update-profile.hook";

import SidebarWithHeader from "./base";
import AddWalletAddressForm from "./components/add-wallet-address";
import PersonalDetails from "./components/pesonal-details";

const WalletItem = ({ wallet, onRemove, isLoading }: any) => {
  return (
    <Tr>
      <Td>{wallet.name}</Td>
      <Td>{wallet.network}</Td>
      <Td>{wallet.address}</Td>
      <Td>
        <Button
          leftIcon={<FaTrash />}
          onClick={() => onRemove(wallet.id)}
          isLoading={isLoading}
          bg="inherit"
        />
      </Td>
    </Tr>
  );
};

const Wallet = () => {
  const { isSuccess, data, isLoading, refetch: listWallet } = useListWallet();
  const {
    isLoading: isDeleting,
    isSuccess: isDeleted,
    mutate: deleteAddress,
  } = useDeleteAddressHook();
  const handleRemoveWallet = (id: string) => {
    deleteAddress({ id });
  };
  useEffect(() => {
    listWallet();
  }, []);
  useEffect(() => {
    listWallet();
  }, [isDeleted]);
  return (
    <TableContainer mt={3}>
      <Table variant="simple">
        <TableCaption>
          {" "}
          Note all transaction will go the specify wallet added
        </TableCaption>
        <Thead>
          <Tr bg={useColorModeValue("gray.100", "green.500")}>
            <Th>Name</Th>
            <Th>Network</Th>
            <Th>Address</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          )}
          {isSuccess &&
            data.map((wallet: any) => (
              <WalletItem
                wallet={wallet}
                onRemove={handleRemoveWallet}
                isLoading={isDeleting}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalRef: React.MutableRefObject<any> = useRef();

  const { isLoading, data: user, refetch: refectchUser } = getUserHook();

  return (
    <SidebarWithHeader>
      <Box>
        <Wrap mt="20px" mb="20px">
          <WrapItem>
            <Stack
              direction={["column", "row"]}
              spacing="24px"
              alignItems="center"
            >
              <Avatar
                bg={useColorModeValue("black", "green.400")}
                color={useColorModeValue("white", "white")}
                size="md"
                name={!isLoading && user.username}
              />
              <Text fontSize="2xl">Account</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Tabs>
          <TabList>
            <Tab>Personal Details</Tab>
            <Tab>Payment</Tab>
            <Tab>Business Documents</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                width="auto"
                align="center"
                justify="center"
                maxH="70vh"
                height="auto"
              >
                <PersonalDetails user={user} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex justify="flex-end">
                <Button leftIcon={<FaPlus />} onClick={onOpen}>
                  Add wallet
                </Button>
              </Flex>
              <Wallet />
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <AddWalletAddressForm onClose={onClose} />
                </ModalContent>
              </Modal>
            </TabPanel>
            <TabPanel>
              <Flex
                width="auto"
                align="center"
                justify="center"
                maxH="70vh"
                height="auto"
              >
                <Heading>Coming soon</Heading>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SidebarWithHeader>
  );
};

export default Settings;
