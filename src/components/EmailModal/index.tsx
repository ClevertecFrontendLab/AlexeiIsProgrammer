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
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import coffee from '~/assets/coffee.png';
import { useTrimForm } from '~/hooks/useTrimForm';
import { useForgotPasswordMutation } from '~/query/services/auth';
import { EmailFormData } from '~/types';

import PinModal from '../PinModal';

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
    const { isOpen: isPinOpen, onClose: onPinClose, onOpen: onPinOpen } = useDisclosure();
    const toast = useToast();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const { register, handleSubmit, resetField, formState, getValues } = useTrimForm<EmailFormData>(
        {
            resolver: zodResolver(emailModalSchema),
            mode: 'onChange',
        },
    );

    const onSubmit = (data: EmailFormData) => {
        console.log('data', data);

        forgotPassword(data)
            .unwrap()
            .then(() => {
                onClose();
                onPinOpen();
            })
            .catch((e) => {
                const data = e?.data;

                resetField('email');

                if (data.statusCode === 403) {
                    toast({
                        status: 'error',
                        title: data.message,
                        description:
                            'Попробуйте другой e-mail или проверьте правильность его написания',
                    });
                } else {
                    toast({
                        status: 'error',
                        title: 'Ошибка сервера',
                        description: 'Попробуйте поискать снова попозже',
                    });
                }
            });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent data-test-id='sign-up-success-modal' gap='20px' maxW='396px'>
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
                        data-test-id='close-button'
                    />
                    <ModalBody>
                        <Text
                            color='blackAlpha.900'
                            fontSize='16px'
                            lineHeight='24px'
                            textAlign='center'
                        >
                            Для восстановления входа введите ваш e-mail, куда можно отправить
                            уникальный код
                        </Text>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack spacing={4}>
                                <FormControl isInvalid={!!formState.errors.email}>
                                    <FormLabel>Ваш e-mail</FormLabel>
                                    <Input
                                        data-test-id='email-input'
                                        placeholder='e-mail'
                                        type='email'
                                        {...register('email')}
                                    />
                                    <FormErrorMessage>
                                        {formState.errors.email?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    data-test-id='submit-button'
                                    type='submit'
                                    width='full'
                                    colorScheme='blackAlpha'
                                    disabled={!!formState.errors.email}
                                    isLoading={isLoading}
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
            <PinModal email={getValues().email} onClose={onPinClose} isOpen={isPinOpen} />
        </>
    );
};

export default EmailModal;
