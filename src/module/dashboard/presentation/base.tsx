import type { BoxProps, FlexProps } from "@chakra-ui/react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link as CharkaLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactText, ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaLink,
  FaRegChartBar,
  FaChevronDown,
  FaGripHorizontal,
  FaCogs,
  FaBitcoin,
} from "react-icons/fa";

import ThemeToggle from "../../../lib/layout/ThemeToggle";
import { useAuth } from "../../../lib/shared/context/auth-provider";
import getUserHook from "../application/get-user.hook";

import CreatePaymentLink from "./components/create-payment-link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Overview", icon: FaRegChartBar, path: "/dashboard/" },
  { name: "transactions", icon: FaBitcoin, path: "/dashboard/transactions" },
  { name: "Payment Links", icon: FaLink, path: "/dashboard/payment-links" },
  { name: "Settings", icon: FaCogs, path: "/dashboard/settings" },
];
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}
const NavItem = ({ path, icon, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link href={path} passHref>
      <CharkaLink
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "black",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </CharkaLink>
    </Link>
  );
};
interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout } = useAuth();
  const { isLoading, data } = getUserHook();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FaGripHorizontal />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <ThemeToggle />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  color="white"
                  bg={useColorModeValue("black", "green.400")}
                  name={!isLoading && data?.username}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{!isLoading && data?.username}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FaChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
interface SidebarProps extends BoxProps {
  onClose: () => void;
  onOpenPaymentLink: () => void;
}

const SidebarContent = ({
  onOpenPaymentLink,
  onClose,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#EDF2F6", "black")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Loowi
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Button
        mx="4"
        variant="outline"
        colorScheme={useColorModeValue("twitter.600", "whatsapp.500")}
        onClick={onOpenPaymentLink}
      >
        Create Payment Link
      </Button>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: showPaymentLink,
    onOpen: openPaymentLink,
    onClose: closePaymentLink,
  } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        onOpenPaymentLink={openPaymentLink}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            onOpenPaymentLink={openPaymentLink}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      {showPaymentLink && (
        <CreatePaymentLink
          isOpen={showPaymentLink}
          onClose={closePaymentLink}
        />
      )}
    </Box>
  );
}
