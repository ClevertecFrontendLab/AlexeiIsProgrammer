import { Box, Container, Flex, Img } from '@chakra-ui/react';

import logo from '~/assets/logo.svg';

import Breadcrumbs from '../Breadcrumbs';
import CardAvatar from '../CardAvatar';

function Header() {
    return (
        <Box bg='lime.50' p={4}>
            <Flex align='center'>
                <Img src={logo} />

                <Container maxW='6xl'>
                    <Breadcrumbs />
                </Container>
                <CardAvatar />
            </Flex>
        </Box>
    );
}

export default Header;
