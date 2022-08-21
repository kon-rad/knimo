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
          <NextLink href="/" passHref={true} className="pointer">
            <Flex align="center">
              <Image
                borderRadius="50%"
                mr="4"
                src="/key-logo.png"
                width="60px"
                marginLeft="20px"
              />
              <Text fontSize="28px" fontWeight="bold" mr="2" color="white">
                KNIMO
              </Text>
            </Flex>
          </NextLink>
        </LinkBox>
        <Spacer />
        <Flex justify="space-around" align="center" width="40%">
            <Box mr={4}>
                <LinkBox>
                    <NextLink href={`/member/${address}`} passHref={true}>
                        <Text fontSize="28px" fontWeight="bold" mr="2" color="white" className="pointer">
                            Member
                        </Text>
                    </NextLink>
                </LinkBox>
            </Box>
            <Box mr={4}>
            <LinkBox>
                <NextLink href={`/club/${address}`} passHref={true}>
                    <Text fontSize="28px" fontWeight="bold" mr="2" color="white" className="pointer">
                        Club
                    </Text>
                </NextLink>
            </LinkBox>
            </Box>
        </Flex>
        
        <Box>
          <Wallet />
        </Box>
      </Flex>
    );
  };
  
  export default Header;
  