import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

function CardAvatar() {
    return (
        <Flex gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

            <Box>
                <Text fontSize='18px' lineHeight='28px' fontWeight='500'>
                    Екатерина Константинопольская
                </Text>
                <Text fontSize='14px' color='blackAlpha.700'>
                    @bake_and_pie UI
                </Text>
            </Box>
        </Flex>
    );
}

export default CardAvatar;
