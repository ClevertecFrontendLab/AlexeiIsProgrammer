import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type CardAvatarProps = {
    className?: string;
    name: string;
    image: string;
    tag: string;
};

function CardAvatar({ name, image, tag, className }: CardAvatarProps) {
    return (
        <Flex gap='4' alignItems='center' flexWrap='wrap' className={className}>
            <Avatar name={name} src={image} />

            <Box>
                <Text fontSize='18px' lineHeight='28px' fontWeight='500'>
                    {name}
                </Text>
                <Text fontSize='14px' color='blackAlpha.700'>
                    {tag}
                </Text>
            </Box>
        </Flex>
    );
}

export default CardAvatar;
