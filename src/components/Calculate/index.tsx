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

import {
    DECREMENT_STEPPER,
    INCREMENT_STEPPER,
    INGREDIENT_QUANTITY,
} from '~/query/constants/test-id';
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
                                    <NumberIncrementStepper data-test-id={INCREMENT_STEPPER} />
                                    <NumberDecrementStepper data-test-id={DECREMENT_STEPPER} />
                                </NumberInputStepper>
                            </NumberInput>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingredient, i) => (
                        <Tr key={ingredient.title}>
                            <Td>{ingredient.title}</Td>
                            <Td isNumeric>
                                <span data-test-id={`${INGREDIENT_QUANTITY}-${i}`}>
                                    {initialPortions
                                        ? (+(ingredient.count || '0') / initialPortions) *
                                              portions || ''
                                        : ''}
                                </span>{' '}
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
