import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, SimpleGrid, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';

import Item from '../Item';

const Subcategory = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Flex direction='column' alignItems='center'>
            <SimpleGrid
                spacing='24px'
                columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
            >
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </SimpleGrid>
            <Button rightIcon={<ArrowForwardIcon />} bg='lime.400'>
                Загрузить ещё
            </Button>
        </Flex>
    );
};

export default Subcategory;
