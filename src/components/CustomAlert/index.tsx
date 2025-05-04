import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertStatus,
    AlertTitle,
    Box,
    CloseButton,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type CustomAlertProps = Partial<{
    onClose: () => void;
    title: ReactNode;
    description: ReactNode;
    status: AlertStatus;
}>;

export default function CustomAlert({ onClose, title, description, status }: CustomAlertProps) {
    return (
        <Alert maxW='400px' position='relative' status={status} variant='solid'>
            <AlertIcon />
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Box>
            <CloseButton
                position='absolute'
                alignSelf='flex-start'
                right={0}
                top={0}
                onClick={onClose}
            />
        </Alert>
    );
}
