import { Card, Text, useBreakpointValue } from '@chakra-ui/react';

type RecipeInfoProps = {
    label: string;
    value: number;
    measure: string;
};

const RecipeInfo = ({ label, value, measure }: RecipeInfoProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Card
            overflow='hidden'
            variant='outline'
            p='16px'
            display='grid'
            gridTemplateColumns={isMobile ? 'repeat(3, 1fr)' : '1fr'}
            justifyContent='space-between'
            align='center'
        >
            <Text
                textAlign={isMobile ? 'left' : 'center'}
                color='blackAlpha.600'
                textTransform='lowercase'
            >
                {label}
            </Text>
            <Text
                textAlign='center'
                fontWeight='500'
                color='lime.800'
                fontSize='36px'
                lineHeight='40px'
            >
                {value}
            </Text>
            <Text
                textAlign='center'
                color='blackAlpha.600'
                fontWeight='semibold'
                textTransform='uppercase'
            >
                {measure}
            </Text>
        </Card>
    );
};

export default RecipeInfo;
