import { Button, Card, Image, Text } from '@chakra-ui/react';

type FactProps = {
    icon: string;
    text: string;
};

const Fact = ({ icon, text }: FactProps) => (
    <Card align='center' w='100%' direction='row' gap='12px' py='14px' px='24px'>
        <Image w='24px' src={icon} />
        <Text
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
            flex={1}
            lineHeight='140%'
            fontSize='20px'
            fontWeight='500'
        >
            {text}
        </Text>
        <Button colorScheme='green' variant='outline'>
            Готовить
        </Button>
    </Card>
);

export default Fact;
