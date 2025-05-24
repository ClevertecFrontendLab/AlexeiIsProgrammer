import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import coffee from '~/assets/coffee.png';
import { EmailFormData } from '~/types';

type EmailModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const emailModalSchema = z.object({
    email: z
        .string()
        .min(1, 'Введите e-mail')
        .email('Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
});

const EmailModal = ({ isOpen, onClose }: EmailModalProps) => {
    const { register, handleSubmit, formState } = useForm<EmailFormData>({
        resolver: zodResolver(emailModalSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: EmailFormData) => {
        console.log(data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent gap='20px' maxW='396px'>
                <ModalHeader display='flex' justifyContent='center'>
                    <Image src={coffee} />
                </ModalHeader>
                <ModalCloseButton
                    borderRadius='50px'
                    border='1px solid black'
                    bg='white'
                    color='black'
                    w='24px'
                    h='24px'
                />
                <ModalBody>
                    <Text
                        color='blackAlpha.900'
                        fontSize='16px'
                        lineHeight='24px'
                        textAlign='center'
                    >
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
                    </Text>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl isInvalid={!!formState.errors.email}>
                                <FormLabel>Ваш e-mail</FormLabel>
                                <Input placeholder='e-mail' type='email' {...register('email')} />
                                <FormErrorMessage>
                                    {formState.errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                type='submit'
                                width='full'
                                colorScheme='blackAlpha'
                                disabled={!!formState.errors.email}
                            >
                                Получить код
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>

                <ModalFooter justifyContent='center'>
                    <Text
                        color='blackAlpha.600'
                        fontSize='12px'
                        lineHeight='16px'
                        textAlign='center'
                    >
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EmailModal;
