// LoginForm.tsx
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as z from 'zod';

import CustomSpinner from '~/components/CustomSpinner';
import EmailModal from '~/components/EmailModal';
import WrongLoginModal from '~/components/WrongLoginModal';
import { APP_LOADER } from '~/constants/test-id';
import { useTrimForm } from '~/hooks/useTrimForm';
import { useLoginMutation } from '~/query/services/auth';
import { LoginFormData } from '~/types';

const loginSchema = z.object({
    login: z.string().min(1, 'Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: z.string().min(1, 'Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

const Login = () => {
    const toast = useToast();
    const {
        isOpen: isEmailModalOpen,
        onOpen: onEmailModalOpen,
        onClose: onEmailModalClose,
    } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState,
        watch,
        formState: { errors },
    } = useTrimForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const isFormValid = (): boolean => {
        const values = watch();
        return (
            !!values.login &&
            !!values.password &&
            !formState.errors.login &&
            !formState.errors.password
        );
    };

    const onSubmit = (data: LoginFormData) => {
        login(data)
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                const data = err?.data;

                if (data.statusCode === 401) {
                    toast({
                        status: 'error',
                        title: 'Неверный логин или пароль',
                        description: 'Попробуйте снова.',
                    });
                } else if (data.statusCode === 403) {
                    toast({
                        status: 'error',
                        title: 'E-mail не верифицирован',
                        description: 'Проверьте почту или перейдите по ссылке',
                    });
                } else if (data.statusCode >= 500 && data.statusCode <= 599) {
                    onOpen();
                }
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id='sign-in-form'>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel>Логин для входа на сайт</FormLabel>
                        <Input data-test-id='login-input' {...register('login')} />
                        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Пароль</FormLabel>
                        <InputGroup>
                            <Input
                                data-test-id='password-input'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                            />
                            <InputRightElement>
                                <Button
                                    data-test-id='password-visibility-button'
                                    variant='ghost'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        data-test-id='submit-button'
                        type='submit'
                        width='full'
                        colorScheme='blackAlpha'
                        isDisabled={!isFormValid()}
                    >
                        Войти
                    </Button>
                    <Link onClick={onEmailModalOpen} data-test-id='forgot-password' color='black'>
                        Забыли логин или пароль?
                    </Link>
                </VStack>
            </form>
            {isLoading && <CustomSpinner data-test-id={APP_LOADER} spinnerOverflow />}
            <EmailModal isOpen={isEmailModalOpen} onClose={onEmailModalClose} />
            <WrongLoginModal isOpen={isOpen} onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </>
    );
};

export default Login;
