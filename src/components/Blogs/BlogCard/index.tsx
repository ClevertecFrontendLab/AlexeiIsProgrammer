import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import React from 'react';

import CardAvatar from '~/components/CardAvatar';

type BlogCardProps = {
    avatar: { name: string; tag: string; image: string };
    description: string;
};

const BlogCard = ({ avatar, description }: BlogCardProps) => (
    <Card _hover={{ shadow: 'md' }} variant='outline'>
        <CardHeader>
            <CardAvatar name={avatar.name} image={avatar.image} tag={avatar.tag} />
        </CardHeader>
        <CardBody>
            <Text>{description}</Text>
        </CardBody>
    </Card>
);

export default BlogCard;
