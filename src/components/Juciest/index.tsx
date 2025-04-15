import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
    useBreakpointValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import Item from '../Item';

const Juciest = () => {
    const navigate = useNavigate();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Box mt='40px'>
            <Flex mb='24px' justifyContent='space-between' alignItems='flex-end'>
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='500'
                    textAlign='left'
                >
                    Самое сочное
                </Text>

                <Button
                    onClick={() => navigate('/juciest')}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    data-test-id='juiciest-link'
                    display={!isMobile ? 'block' : 'none'}
                >
                    Вся подборка
                </Button>
            </Flex>

            <Flex direction='column' alignItems='center'>
                <SimpleGrid
                    spacing='24px'
                    columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
                >
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </SimpleGrid>
                <Button
                    onClick={() => navigate('/juciest')}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    data-test-id='juiciest-link-mobile'
                    display={isMobile ? 'block' : 'none'}
                >
                    Вся подборка
                </Button>
            </Flex>
        </Box>
    );
};

export default Juciest;
