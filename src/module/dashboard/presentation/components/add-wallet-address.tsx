import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import useAddAddressHook from "../../application/add-address.hooks";
import useListWallet from "../../application/list-address.hook";
import { networks } from "../../util";

interface IAddAddressInput {
  address: string;
  network: string;
}

const AddWalletAddressForm = ({ onClose }: any) => {
  const addAddressMutation: any = useAddAddressHook();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAddAddressInput>();
  const { refetch: listWallet } = useListWallet();

  const onSubmit = ({ address, network }: any) => {
    addAddressMutation.mutate({ address, network } as any);
  };

  if (addAddressMutation.isSuccess) {
    onClose();
    listWallet();
  }
  return (
    <Box p={10} shadow="sm" borderWidth="1px">
      <Box mt={5} mb={5}>
        <Heading fontSize="xl" mb="10px">
          Add Address
        </Heading>
        <Text fontSize="sm" color={useColorModeValue("gray.500", "white")}>
          Add wallet address to recieve your payment.
        </Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack my="20px">
          <Input
            my="10px"
            placeholder="Wallet Address 0x3e..."
            {...register("address", { min: 3 })}
            isInvalid={!!errors.address}
          />
          <Select
            size="lg"
            placeholder="select a network"
            {...register("network", { min: 3 })}
            isInvalid={!!errors.network}
          >
            {networks.map((network) => (
              <option value={network}>{network}</option>
            ))}
          </Select>
        </Stack>
        <Button
          variant="solid"
          mt="sm"
          type="submit"
          bg={useColorModeValue("black", "green")}
          color={useColorModeValue("white", "white")}
          isLoading={addAddressMutation.isLoading}
          _hover={{
            bg: "gray.600",
          }}
        >
          Add Address
        </Button>
        <Box>
          {addAddressMutation.isError && (
            <Alert status="error">
              <AlertIcon />
              <Box>{addAddressMutation.error?.response?.data?.message}</Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={() => {}}
              />
            </Alert>
          )}
          {addAddressMutation.isSuccess && (
            <Alert status="success">
              <AlertIcon />
              Address added successfully
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={() => {}}
              />
            </Alert>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddWalletAddressForm;
