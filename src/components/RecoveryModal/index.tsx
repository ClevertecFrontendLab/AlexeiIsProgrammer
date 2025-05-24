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
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PASSWORD_REGX } from '~/constants';
import { RecoveryFormData } from '~/types';

type RecoveryModalProps = {
    isOpen: boolean;
    onClose: () => void;
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
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

const RecoveryModal = ({ isOpen, onClose }: RecoveryModalProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState, getFieldState, watch } = useForm<RecoveryFormData>({
        resolver: zodResolver(recoverySchema),
        mode: 'onChange',
    });

    const currentValues = watch();
    const isFormValid = (): boolean =>
        ['login', 'password', 'confirmPassword'].every(
            (field) =>
                !getFieldState(field as keyof RecoveryFormData).invalid &&
                !!currentValues[field as keyof RecoveryFormData],
        );

    const onSubmit = (data: RecoveryFormData) => {
        console.log(data);
        onClose();
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
                                            onMouseDown={() => setShowPassword((prev) => !prev)}
                                            onMouseUp={() => setShowPassword((prev) => !prev)}
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

                            <FormControl isInvalid={!!formState.errors.confirmPassword}>
                                <FormLabel>Повторите пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        data-test-id='confirm-password-input'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                    />
                                    <InputRightElement>
                                        <Button
                                            variant='ghost'
                                            onMouseDown={() =>
                                                setShowConfirmPassword((prev) => !prev)
                                            }
                                            onMouseUp={() =>
                                                setShowConfirmPassword((prev) => !prev)
                                            }
                                        >
                                            {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {formState.errors.confirmPassword?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Button
                                data-test-id='submit-button'
                                colorScheme='blackAlpha'
                                type='submit'
                                width='full'
                                isDisabled={!isFormValid()}
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
