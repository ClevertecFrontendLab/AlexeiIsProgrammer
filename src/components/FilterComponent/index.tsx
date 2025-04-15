import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import filter from '~/assets/filter.svg';

type FilterComponentProps = {
    title?: string;
    description?: string;
};

const FilterComponent = ({ title, description }: FilterComponentProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <Flex direction='column' alignItems='center'>
            {title && (
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='700'
                    textAlign='center'
                >
                    {title}
                </Text>
            )}
            {description && (
                <Text
                    textAlign='center'
                    mt='12px'
                    color='blackAlpha.600'
                    fontWeight='500'
                    fontSize='16x'
                    lineHeight='24px'
                >
                    {description}
                </Text>
            )}
            <Flex direction='column' gap='16px'>
                <Flex gap='12px' mt={isMobile || !description ? '16px' : '32px'}>
                    <IconButton icon={<Image src={filter} />} aria-label='filter' />
                    <InputGroup>
                        <Input placeholder='Название или ингредиент...' />
                        <InputRightElement>
                            <SearchIcon color='black' />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                {!isMobile && (
                    <Flex gap='16px'>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel
                                whiteSpace='nowrap'
                                fontSize='16px'
                                color='black'
                                htmlFor='allergens'
                                mb='0'
                            >
                                Исключить мои аллергены
                            </FormLabel>
                            <Switch size='md' id='allergens' />
                        </FormControl>
                        <Select placeholder='Выберите из списка'></Select>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default FilterComponent;
