import { AtSignIcon } from '@chakra-ui/icons';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ComponentWithAs,
    Divider,
    Flex,
    Icon,
    IconProps,
    Text,
    VStack,
} from '@chakra-ui/react';
import type React from 'react';
import { Link, useLocation } from 'react-router';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const NavItem = ({
        icon,
        label,
        path,
    }: {
        icon: ComponentWithAs<'svg', IconProps>;
        label: string;
        path: string;
    }) => (
        <Link to={path} style={{ width: '100%' }}>
            <Flex
                align='center'
                p={2}
                mx={2}
                borderRadius='md'
                role='group'
                cursor='pointer'
                bg={isActive(path) ? 'brand.50' : 'transparent'}
                color={isActive(path) ? 'brand.700' : 'gray.700'}
                _hover={{
                    bg: 'brand.50',
                    color: 'brand.700',
                }}
            >
                <Icon as={icon} mr={3} fontSize='16px' />
                <Text fontSize='sm'>{label}</Text>
            </Flex>
        </Link>
    );

    return (
        <Box py={4}>
            <VStack align='stretch' spacing={1}>
                <NavItem icon={AtSignIcon} label='Главная' path='/' />
                <NavItem icon={AtSignIcon} label='Избранное' path='/favorites' />
                <NavItem icon={AtSignIcon} label='Мои рецепты' path='/my-recipes' />
                <NavItem icon={AtSignIcon} label='История' path='/history' />

                <Divider my={2} />

                <Text px={4} fontSize='xs' fontWeight='medium' color='gray.500' mb={1}>
                    КАТЕГОРИИ
                </Text>

                <Accordion allowMultiple defaultIndex={[0]} border='none'>
                    <AccordionItem border='none'>
                        <AccordionButton px={4} py={1} _hover={{ bg: 'transparent' }}>
                            <Box flex='1' textAlign='left' fontSize='sm'>
                                Кухни мира
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={2} pt={0} px={0}>
                            <VStack align='stretch' spacing={0}>
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Вегетарианская кухня'
                                    path='/category/vegetarian'
                                />
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Итальянская кухня'
                                    path='/category/italian'
                                />
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Французская кухня'
                                    path='/category/french'
                                />
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border='none'>
                        <AccordionButton px={4} py={1} _hover={{ bg: 'transparent' }}>
                            <Box flex='1' textAlign='left' fontSize='sm'>
                                Типы блюд
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={2} pt={0} px={0}>
                            <VStack align='stretch' spacing={0}>
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Десерты'
                                    path='/category/desserts'
                                />
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Мясные блюда'
                                    path='/category/meat'
                                />
                                <NavItem
                                    icon={AtSignIcon}
                                    label='Рыбные блюда'
                                    path='/category/fish'
                                />
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <Divider my={2} />

                <NavItem icon={AtSignIcon} label='Популярные' path='/popular' />
                <NavItem icon={AtSignIcon} label='Сохраненные' path='/saved' />
                <NavItem icon={AtSignIcon} label='От шеф-поваров' path='/chef' />
            </VStack>
        </Box>
    );
};

export default Sidebar;
