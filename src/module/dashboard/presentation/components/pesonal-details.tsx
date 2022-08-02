import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  InputGroup,
  Textarea,
  useColorModeValue,
  Flex,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/all";

import getUserHook from "../../application/get-user.hook";
import useUpdateProfileHook from "../../application/update-profile.hook";
import { networks } from "../../util";

interface IUpdateProfileDetailForm {
  username?: string;
  description?: string;
  country?: string;
  industry?: string;
}

const PersonalDetails = ({ user }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const { refetch: refetchUser } = getUserHook();
  const updateProfileMutation = useUpdateProfileHook();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUpdateProfileDetailForm>({
    defaultValues: {
      username: user?.username || "",
      description: user?.description || "",
      country: user?.country || "",
      industry: user?.industry || "",
    },
  });
  const handleUpdateProfileDetails = async ({
    username,
    description,
    country,
    industry,
  }: any) => {
    await updateProfileMutation.mutate({
      username,
      description,
      country,
      industry,
    } as any);
    setIsEdit(!isEdit);
    await refetchUser();
  };

  return (
    <Box p={10} shadow="sm" borderWidth="1px">
      <Flex justify="flex-end">
        <Button
          leftIcon={<FaEdit />}
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          Edit Profile
        </Button>
      </Flex>
      <Box mt={5} mb={5}>
        <Heading fontSize="xl" mb="10px">
          Profile Information
        </Heading>
        <Text fontSize="sm" color={useColorModeValue("gray.500", "white")}>
          Here&apos;s what we know about you. Please update it if there have
          been any recent changes
        </Text>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(handleUpdateProfileDetails)}>
          <InputGroup my="10px">
            <Input
              {...register("username", { minLength: 3 })}
              isInvalid={!!errors.username}
              isDisabled={!isEdit}
              type="text"
              placeholder="enter your username"
            />
          </InputGroup>
          {errors.username && <span> Invalid username enter</span>}
          <InputGroup my="10px">
            <Textarea
              isDisabled={!isEdit}
              {...register("description", { minLength: 3 })}
              isInvalid={!!errors.description}
              placeholder="Company description"
            />
          </InputGroup>
          {errors.description && <span> Invalid company description</span>}
          <InputGroup my="10px">
            <Select
              isDisabled={!isEdit}
              placeholder="select your country"
              {...register("country", { min: 3 })}
              isInvalid={!!errors.country}
            >
              <option value="Nigeria">Nigeria</option>
              <option value="Uae">United Arab Emirate</option>
              <option value="Oman">Oman</option>
              <option value="USA">Usa</option>
            </Select>
          </InputGroup>
          {errors.country && <span> Select a valid country</span>}
          <InputGroup my="10px">
            <Select
              isDisabled={!isEdit}
              placeholder="select your industry"
              {...register("industry", { min: 3 })}
              isInvalid={!!errors.industry}
            >
              <option value="content_creator">content creator</option>
              <option value="resturant">Resturant</option>
              <option value="small_scale_business">Small scale Business</option>
              <option value="others">Others</option>
            </Select>
          </InputGroup>
          <Button
            my="7px"
            size="md"
            isDisabled={!isEdit}
            isLoading={updateProfileMutation.isLoading}
            type="submit"
            colorScheme="white"
            bg={useColorModeValue("black", "green.500")}
          >
            update profile
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PersonalDetails;
