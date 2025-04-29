import {
    Box,
    Card,
    CardBody,
    Flex,
    Image,
    Text,
    useBreakpointValue,
    useMediaQuery,
} from '@chakra-ui/react';

import { Step } from '~/types';

import CustomBadge from '../CustomBadge';

type StepsProps = {
    steps: Step[];
};

const Steps = ({ steps }: StepsProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Box>
            <Text
                color='black'
                lineHeight={isMobile ? '24px' : '48px'}
                fontSize={isMobile ? '24px' : '48px'}
                fontWeight='500'
                textAlign='left'
                mb='20px'
            >
                Шаги приготовления
            </Text>

            <Flex gap='20px' direction='column' alignItems='stretch'>
                {steps.map((step) => (
                    <Card
                        key={step.stepNumber}
                        h={step.image && !isSmallMobile ? '244px' : 'auto'}
                        direction='row'
                        overflow='hidden'
                        variant='outline'
                    >
                        {step.image && <Image w='50%' objectFit='cover' src={step.image} />}
                        <CardBody
                            maxW='50%'
                            py={isMobile ? '8px' : '20px'}
                            px={isMobile ? '8px' : '24px'}
                        >
                            <CustomBadge text={`Шаг ${step.stepNumber}`} />
                            <Text mt='16px'>{step.description}</Text>
                        </CardBody>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
};

export default Steps;
