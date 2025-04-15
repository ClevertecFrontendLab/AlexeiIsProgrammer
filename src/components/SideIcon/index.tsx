import { Flex, Image, Text } from '@chakra-ui/react';

type SideIconProps = {
    icon: string;
    text: string;
    className?: string;
};

const SideIcon = ({ icon, text, className }: SideIconProps) => (
    <Flex gap='6px' px='8px' py='4px' alignItems='center' className={className}>
        <Image w='12px' h='12px' src={icon} />
        <Text lineHeight='14px' fontSize='14px' fontWeight='600' color='lime.600'>
            {text}
        </Text>
    </Flex>
);

export default SideIcon;
