import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { AppRoute } from '~/main';

import Item from '../Item';

type TabbedProps = {
    parent: string;
    tabs: AppRoute[];
};

const Tabbed = ({ parent, tabs }: TabbedProps) => {
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    const { pathname } = useLocation();

    return (
        <Box>
            <Tabs isLazy defaultValue={pathname.substring(pathname.lastIndexOf('/') + 1)}>
                <TabList justifyContent='center'>
                    {tabs.map((tab) => (
                        <Tab
                            color='lime.800'
                            _selected={{ borderColor: 'lime.700', color: 'lime.700' }}
                            value={tab.path}
                            key={tab.path}
                            onClick={() => navigate(`/${parent}/${tab.path}`)}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tabs.map((tab) => (
                        <TabPanel key={tab.path}>
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
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Tabbed;
