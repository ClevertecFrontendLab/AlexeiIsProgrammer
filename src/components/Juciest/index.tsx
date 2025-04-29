import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import Subcategory from '../Subcategory';

const Juciest = () => {
    const navigate = useNavigate();

    const isMobile = useBreakpointValue({ base: true, lg: false });

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
                    onClick={() => navigate('/the-juiciest')}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    data-test-id='juiciest-link'
                    display={!isMobile ? 'block' : 'none'}
                >
                    Вся подборка
                </Button>
            </Flex>

            <Subcategory />

            <Button
                mt='20px'
                onClick={() => navigate('/the-juiciest')}
                rightIcon={<ArrowForwardIcon />}
                bg='lime.400'
                data-test-id='juiciest-link-mobile'
                display={isMobile ? 'block' : 'none'}
            >
                Вся подборка
            </Button>
        </Box>
    );
};

export default Juciest;
