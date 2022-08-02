import {
  Button,
  Input,
  InputGroup,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useColorModeValue,
  Box,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useCreatePaymentLinkHook from "../../application/create-payment-link.hook";

export enum PaymentType {
  standard = "standard",
  donation = "donation",
  monthly = "monthly",
  yearly = "yearly",
}

interface ICreatePaymentLinkForm {
  amount?: number;
  title: string;
  description: string;
  paymentType: PaymentType;
}

const CreatePaymentLink = ({ isOpen, onClose }: any) => {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm<ICreatePaymentLinkForm>();
  const paymentLinkMutation = useCreatePaymentLinkHook();
  const toast = useToast();

  const handleCreatePaymentLink = (input: ICreatePaymentLinkForm) => {
    const { description, title, paymentType, amount } = input;
    if (paymentType === PaymentType.standard && !input.amount) {
      setError("amount", { message: "Amount is required" });
      return;
    }
    paymentLinkMutation.mutate({
      paymentType,
      description,
      title,
      amount,
    });
  };

  useEffect(() => {
    if (paymentLinkMutation.isSuccess) {
      toast({
        title: "Payment Link.",
        description: "payment link created successfully",
        position: "bottom-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
    if (paymentLinkMutation.isError) {
      toast({
        title: "Payment Link.",
        position: "bottom-right",
        description: "Bad Request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [paymentLinkMutation.isSuccess, paymentLinkMutation.isError]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleCreatePaymentLink)}>
          <ModalHeader>Create Payment Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text
              fontSize="sm"
              colorScheme={useColorModeValue("gray.500", "white.700")}
            >
              {" "}
              Start receiving digital payments from fans, customers around the
              world with ease and speed
            </Text>
            <Box mt="6">
              <InputGroup mb="3">
                <Input
                  placeholder="Title"
                  {...register("title", { minLength: 5, maxLength: 100 })}
                  isInvalid={!!errors.title}
                />
              </InputGroup>
              {errors.title && (
                <Text fontSize="xs" color="red">
                  {errors.title.message}
                </Text>
              )}
              <InputGroup>
                {/* eslint-disable-next-line react/no-children-prop */}
                <InputLeftAddon children="USD" />
                <NumberInput
                  precision={2}
                  width="100%"
                  isInvalid={!!errors.amount}
                >
                  <NumberInputField
                    placeholder="0.00"
                    {...register("amount", { valueAsNumber: true, min: 1 })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              {errors.amount && (
                <Text fontSize="xs" color="red">
                  {errors.amount.message}
                </Text>
              )}
              <InputGroup mb={3} mt={3}>
                <Textarea
                  placeholder="Description...."
                  size="sm"
                  {...register("description", { minLength: 50 })}
                  isInvalid={!!errors.description}
                />
              </InputGroup>
              {errors.description && (
                <Text fontSize="xs" color="red">
                  {errors.description.message}
                </Text>
              )}
              <RadioGroup mb={3} mt={3}>
                <Stack direction="row" spacing={5}>
                  <Radio value="standard" {...register("paymentType")}>
                    standard
                  </Radio>
                  <Radio value="donation" {...register("paymentType")}>
                    donation
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              isLoading={paymentLinkMutation.isLoading}
              type="submit"
              bg={useColorModeValue("blackAlpha.900", "green.500")}
              mr={3}
            >
              Create Link
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreatePaymentLink;
