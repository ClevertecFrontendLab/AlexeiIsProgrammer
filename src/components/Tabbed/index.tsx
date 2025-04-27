import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { AppRoute } from '~/routes';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentRoute from '~/utils/getCurrentRoute';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

const Tabbed = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const currentRoute = getCurrentRoute(currentCategory);

    const parent = currentRoute?.path;

    const tabs: AppRoute[] = currentRoute?.children || [];

    const currentIndex = tabs.findIndex((tab) => tab.path === currentSubcategory);

    console.log('currentIndex', currentIndex, tabs);

    return (
        <Box>
            <Tabs index={currentIndex} isLazy>
                <TabList
                    justifyContent={isMobile ? 'flex-start' : 'center'}
                    pb='5px'
                    overflowX='auto'
                    flexWrap={isMobile ? 'nowrap' : 'wrap'}
                >
                    {tabs.map((tab) => (
                        <Tab
                            flexShrink={0}
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
                            <Outlet />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Tabbed;
