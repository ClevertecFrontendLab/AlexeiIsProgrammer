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
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { LoginFormData } from '~/types';

const loginSchema = z.object({
    login: z.string().min(1, 'Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: z.string().min(1, 'Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const isFormValid = (): boolean => {
        const values = watch();
        return (
            !!values.login &&
            !!values.password &&
            !formState.errors.login &&
            !formState.errors.password
        );
    };

    const onSubmit = (data: LoginFormData) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.login}>
                    <FormLabel>Логин для входа на сайт</FormLabel>
                    <Input {...register('login')} />
                    <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Пароль</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                        />
                        <InputRightElement>
                            <Button variant='ghost' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button type='submit' width='full' colorScheme='dark' isDisabled={!isFormValid()}>
                    Войти
                </Button>
            </VStack>
        </form>
    );
};

export default Login;
