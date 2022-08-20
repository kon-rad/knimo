import {
    Text,
    Image,
    Button,
    Flex,
    LinkBox,
    Spacer,
    Box,
    useMediaQuery,
    Input
  } from "@chakra-ui/react";
  import { Search2Icon } from '@chakra-ui/icons';
  import NextLink from "next/link";
  import Wallet from "./wallet";
  import { AddIcon } from "@chakra-ui/icons";
  import { useAppState } from "../context/appState";
  import { mdiCart } from '@mdi/js';
  import Icon from '@mdi/react'
  import { useAccount } from 'wagmi'
  
  const Header = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const { address } = useAccount();
  
    return (
      <Flex as="header" p={4} alignItems="center" className="header-container">
        <LinkBox cursor="pointer">
          <NextLink href="/" passHref={true}>
            <Flex align="center">
              <Image
                borderRadius="50%"
                mr="4"
                src="/images/logos/logo1.png"
                width="40px"
                height="40px"
              />
            </Flex>
          </NextLink>
        </LinkBox>
        <Spacer />
        <Box mr={4}>
          <Flex justify="center" align="center">
          </Flex>
        </Box>
        <Box mr={4}>
          <LinkBox>
            <NextLink href={`/member/${address}`} passHref={true}>
                <Text fontSize="md" fontWeight="bold" mr="2" color="black">
                  Member
                </Text>
            </NextLink>
          </LinkBox>
        </Box>
        <Box mr={4}>
          <LinkBox>
            <NextLink href={`/club/${address}`} passHref={true}>
                <Text fontSize="md" fontWeight="bold" mr="2" color="black">
                  Club
                </Text>
            </NextLink>
          </LinkBox>
        </Box>
        <Box>
          <Wallet />
        </Box>
      </Flex>
    );
  };
  
  export default Header;
  