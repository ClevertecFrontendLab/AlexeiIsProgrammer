import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { TAB } from '~/constants/test-id';
import { useGetCategoriesQuery } from '~/query/services/categories';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

const Tabbed = () => {
    const { data: routes } = useGetCategoriesQuery();
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const category = useMemo(
        () => routes?.find((category) => category.category === currentCategory),
        [currentCategory, routes],
    );

    const tabs = category?.subCategories || [];
    const parent = category?.category;

    const currentIndex = tabs?.findIndex((tab) => tab.category === currentSubcategory);

    return (
        <Box>
            <Tabs index={currentIndex} isLazy>
                <TabList
                    justifyContent={isMobile ? 'flex-start' : 'center'}
                    pb='5px'
                    overflowX='auto'
                    flexWrap={isMobile ? 'nowrap' : 'wrap'}
                >
                    {tabs.map((tab, i) => (
                        <Tab
                            data-test-id={`${TAB}-${tab.category}-${i}`}
                            flexShrink={0}
                            color='lime.800'
                            _selected={{ borderColor: 'lime.700', color: 'lime.700' }}
                            value={tab.category}
                            key={tab.category}
                            onClick={() => navigate(`/${parent}/${tab.category}`)}
                        >
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {tabs.map((tab) => (
                        <TabPanel key={tab.category}>
                            <Outlet />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Tabbed;
