import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { PASSWORD_REGX } from '~/constants';
import { APP_LOADER } from '~/constants/test-id';
import { useTrimForm } from '~/hooks/useTrimForm';
import { useResetPasswordMutation } from '~/query/services/auth';
import { RecoveryFormData } from '~/types';

import CustomSpinner from '../CustomSpinner';

type RecoveryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    email: string;
};

const recoverySchema = z
    .object({
        login: z
            .string()
            .min(1, 'Введите логин')
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(PASSWORD_REGX, 'Не соответствует формату'),
        password: z
            .string()
            .min(1, 'Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(PASSWORD_REGX, 'Не соответствует формату'),
        passwordConfirm: z
            .string()
            .min(1, 'Введите пароль')
            .min(8, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(PASSWORD_REGX, 'Не соответствует формату'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли должны совпадать',
        path: ['passwordConfirm'],
    });

type RecoveryFormDataHook = Omit<RecoveryFormData, 'email'>;

const RecoveryModal = ({ isOpen, onClose, email }: RecoveryModalProps) => {
    const toast = useToast();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useTrimForm<RecoveryFormDataHook>({
        resolver: zodResolver(recoverySchema),
        mode: 'onChange',
    });

    const onSubmit = (data: RecoveryFormDataHook) => {
        resetPassword({ email, ...data })
            .unwrap()
            .then(() => {
                onClose();
                navigate('/login');
                toast({
                    status: 'success',
                    title: 'Восстановление данных успешно',
                    description: '',
                });
            })
            .catch((err) => {
                const data = err?.data;

                if (!data) return;

                toast({
                    status: 'error',
                    title: 'Ошибка сервера',
                    description: 'Попробуйте немного позже',
                });
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent data-test-id='reset-credentials-modal' gap='20px' maxW='396px'>
                <ModalHeader display='flex' justifyContent='center'>
                    <Text
                        fontWeight={700}
                        color='black'
                        fontSize='24px'
                        lineHeight='32px'
                        textAlign='center'
                    >
                        Восстановление аккаунта
                    </Text>
                </ModalHeader>
                <ModalCloseButton
                    data-test-id='close-button'
                    borderRadius='50px'
                    border='1px solid black'
                    bg='white'
                    color='black'
                    w='24px'
                    h='24px'
                />
                <ModalBody>
                    {isLoading && <CustomSpinner data-test-id={APP_LOADER} spinnerOverflow />}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl isInvalid={!!formState.errors.login}>
                                <FormLabel>Логин для входа на сайт</FormLabel>
                                <Input data-test-id='login-input' {...register('login')} />
                                <FormHelperText>
                                    Логин не менее 5 символов, только латиница
                                </FormHelperText>
                                <FormErrorMessage>
                                    {formState.errors.login?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!formState.errors.password}>
                                <FormLabel>Пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        data-test-id='password-input'
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant='ghost'
                                            onMouseDown={() => setShowPassword(true)}
                                            onMouseUp={() => setShowPassword(false)}
                                        >
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText>
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </FormHelperText>
                                <FormErrorMessage>
                                    {formState.errors.password?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!formState.errors.passwordConfirm}>
                                <FormLabel>Повторите пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        data-test-id='confirm-password-input'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('passwordConfirm')}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant='ghost'
                                            onMouseDown={() => setShowConfirmPassword(true)}
                                            onMouseUp={() => setShowConfirmPassword(false)}
                                        >
                                            {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {formState.errors.passwordConfirm?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Button
                                data-test-id='submit-button'
                                colorScheme='blackAlpha'
                                type='submit'
                                width='full'
                            >
                                Зарегистрироваться
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>

                <ModalFooter justifyContent='center'></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RecoveryModal;
