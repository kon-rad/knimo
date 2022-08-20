import { ReactNode } from 'react';

import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    Image,
} from '@chakra-ui/react';

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text
            fontWeight={'500'}
            fontSize={'lg'}
            mb={2}
        >
            {children}
        </Text>
    );
};

export default function Footer() {
    return (
        <>
            <Box className={'footer'}>
                <Container as={Stack} maxW={'6xl'} py={10}>
                    <SimpleGrid
                        templateColumns={{
                            sm: '1fr 1fr',
                            md: '2fr 1fr 1fr 1fr 1fr',
                        }}
                        spacing={8}
                    >
                        <Stack spacing={6}>
                            <Box>
                                <Image
                                    borderRadius="xl"
                                    src="/images/logos/logo1-circle.png"
                                    w="100px"
                                    h="100px"
                                />
                            </Box>
                            <Text fontSize={'sm'}>
                                © 2022 knimo All rights
                                reserved
                            </Text>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Links</ListHeader>
                            {/* <Link href={'#'}>FAQ</Link> */}
                            {/* <Link href={'https://dcom.market'}>Roadmap</Link> */}
                            {/* <Link href={'#'}>Search</Link> */}
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Company</ListHeader>
                            {/* <Link href={'#'}>About</Link> */}
                            {/* <Link href={'https://dcom.market'}>Blog</Link> */}
                            {/* <Link href={'#'}>Values</Link>
                            <Link href={'#'}>Contact</Link> */}
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Support</ListHeader>
                            {/* <Link href={'#'}>Help Center</Link>
                            <Link href={'#'}>Terms of Service</Link>
                            <Link href={'#'}>Legal</Link>
                            <Link href={'#'}>Privacy Policy</Link> */}
                            {/* <Link href={'/credits'}>Credits</Link> */}
                        </Stack>
                        <Stack align={'flex-start'}>
                            {/* <ListHeader>Follow Us</ListHeader> */}
                            {/* <Link href={'#'}>Discord</Link> */}
                            {/* <Link href={'https://twitter.com/dcom_market'}>Twitter</Link> */}
                            {/* <Link href={'#'}>YouTube</Link>
                            <Link href={'#'}>Instagram</Link>
                            <Link href={'#'}>GitHub</Link> */}
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
}
