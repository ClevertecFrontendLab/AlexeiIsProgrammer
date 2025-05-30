import { Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import notFound from '~/assets/404.png';
import { ERROR_PAGE_GO_HOME } from '~/constants/test-id';

const Error = () => (
    <Flex
        h='100%'
        w='100%'
        justifyContent='center'
        alignItems='center'
        direction='column'
        gap='32px'
    >
        <Image maxW='206px' src={notFound} />
        <Flex gap='16px' direction='column' alignItems='center'>
            <Text
                as='h1'
                textAlign='center'
                color='black'
                fontSize='24px'
                lineHeight='32px'
                fontWeight='700'
            >
                Упс! Такой страницы нет
            </Text>
            <Text color='blackAlpha.700' textAlign='center'>
                Можете поискать другой рецепт{' '}
                <Link
                    data-test-id={ERROR_PAGE_GO_HOME}
                    textDecoration='underline'
                    to='/'
                    as={RouterLink}
                >
                    здесь.
                </Link>
            </Text>
        </Flex>
    </Flex>
);

export default Error;
