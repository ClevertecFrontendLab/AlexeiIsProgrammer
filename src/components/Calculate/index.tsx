import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Ingredient } from '~/types';

type CalculateProps = {
    portions?: number;
    ingredients: Ingredient[];
};

const Calculate = ({ portions: initialPortions, ingredients }: CalculateProps) => {
    const [portions, setPortions] = useState<number>(initialPortions || 1);

    return (
        <TableContainer mb='40px'>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    <Tr>
                        <Th color='lime.600'>ингредиенты</Th>
                        <Th
                            pr='0px'
                            isNumeric
                            display='flex'
                            alignItems='center'
                            justifyContent='flex-end'
                            gap='16px'
                        >
                            <Text h='auto' color='lime.600'>
                                порций
                            </Text>
                            <NumberInput
                                w='90px'
                                min={1}
                                value={portions}
                                onChange={(e) => setPortions(+e)}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingredient) => (
                        <Tr key={ingredient.title}>
                            <Td>{ingredient.title}</Td>
                            <Td isNumeric>
                                {+(ingredient.count || '0') * portions || ''}{' '}
                                {ingredient.measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default Calculate;
