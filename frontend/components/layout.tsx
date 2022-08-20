import Header from './header';
import Footer from './footer';
import { Box, Container } from '@chakra-ui/react';
import React from 'react';

type Props = {
    children: React.ReactNode
}

const Layout = (props: Props) => {
    return (
        <Box>
            <Header />
            <Box mb={48}>
                {props.children}
            </Box>
            <Footer/>
        </Box>
    )
}

export default Layout;