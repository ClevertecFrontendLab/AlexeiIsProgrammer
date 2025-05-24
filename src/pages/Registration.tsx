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
    Progress,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import VerificationModal from '~/components/VerificationModal';
import { CIRYLLIC_REGX, CIRYLLIC_SYMB_REGX, PASSWORD_REGX } from '~/constants';
import { RegistrationFormData } from '~/types';

const registrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'Введите имя')
            .max(50, 'Максимальная длина 50 символов')
            .regex(CIRYLLIC_REGX, 'Должно начинаться с кириллицы А-Я')
            .regex(CIRYLLIC_SYMB_REGX, 'Только кириллица А-Я, и "-"'),
        lastName: z
            .string()
            .min(1, 'Введите фамилию')
            .max(50, 'Максимальная длина 50 символов')
            .regex(CIRYLLIC_REGX, 'Должно начинаться с кириллицы А-Я')
            .regex(CIRYLLIC_SYMB_REGX, 'Только кириллица А-Я, и "-"'),
        email: z
            .string()
            .min(1, 'Введите e-mail')
            .email('Введите корректный e-mail')
            .max(50, 'Максимальная длина 50 символов'),
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

const Registration = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState, watch, trigger, getFieldState } =
        useForm<RegistrationFormData>({
            resolver: zodResolver(registrationSchema),
            mode: 'onChange',
        });

    const currentValues = watch();
    const currentStepFields =
        step === 1 ? ['firstName', 'lastName', 'email'] : ['login', 'password', 'confirmPassword'];

    const calculateProgress = useMemo((): number => {
        const totalFields = 6;
        let validFields = 0;

        if (!getFieldState('firstName').invalid && currentValues.firstName) validFields++;
        if (!getFieldState('lastName').invalid && currentValues.lastName) validFields++;
        if (!getFieldState('email').invalid && currentValues.email) validFields++;
        if (!getFieldState('login').invalid && currentValues.login) validFields++;
        if (!getFieldState('password').invalid && currentValues.password) validFields++;
        if (
            !getFieldState('confirmPassword').invalid &&
            currentValues.confirmPassword &&
            currentValues.password === currentValues.confirmPassword
        )
            validFields++;

        return (validFields / totalFields) * 100;
    }, [currentValues, getFieldState]);

    const onSubmit = (data: RegistrationFormData) => {
        console.log(data);
        onOpen();
    };

    const handleNextStep = async () => {
        const isValid = await trigger(currentStepFields as [keyof RegistrationFormData]);
        if (isValid) setStep(2);
    };

    const isStepValid = (): boolean =>
        currentStepFields.every(
            (field) =>
                !getFieldState(field as keyof RegistrationFormData).invalid &&
                !!currentValues[field as keyof RegistrationFormData],
        );

    return (
        <>
            <form data-test-id='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize='16px' textAlign='left'>
                    {step === 1 ? 'Шаг 1. Личная информация' : 'Шаг 2. Логин и пароль'}
                </Text>
                <Progress
                    data-test-id='sign-up-progress'
                    value={calculateProgress}
                    mb={4}
                    colorScheme='green'
                    hasStripe
                />

                {step === 1 && (
                    <VStack spacing={4}>
                        <FormControl isInvalid={!!formState.errors.firstName}>
                            <FormLabel>Ваше имя</FormLabel>
                            <Input data-test-id='first-name-input' {...register('firstName')} />
                            <FormErrorMessage>
                                {formState.errors.firstName?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!formState.errors.lastName}>
                            <FormLabel>Ваша фамилия</FormLabel>
                            <Input data-test-id='last-name-input' {...register('lastName')} />
                            <FormErrorMessage>
                                {formState.errors.lastName?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!formState.errors.email}>
                            <FormLabel>Ваше email</FormLabel>
                            <Input data-test-id='email-input' type='email' {...register('email')} />
                            <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        <Button
                            data-test-id='submit-button'
                            colorScheme='blackAlpha'
                            width='full'
                            onClick={handleNextStep}
                            isDisabled={!isStepValid()}
                        >
                            Дальше
                        </Button>
                    </VStack>
                )}

                {step === 2 && (
                    <VStack spacing={4}>
                        <FormControl isInvalid={!!formState.errors.login}>
                            <FormLabel>Логин входа на сайт</FormLabel>
                            <Input data-test-id='login-input' {...register('login')} />
                            <FormHelperText>
                                Логин не менее 5 символов, только латиница
                            </FormHelperText>
                            <FormErrorMessage>{formState.errors.login?.message}</FormErrorMessage>
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
                                        onMouseDown={() => setShowConfirmPassword((prev) => !prev)}
                                        onMouseUp={() => setShowConfirmPassword((prev) => !prev)}
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
                            colorScheme='blackAlpha'
                            type='submit'
                            data-test-id='submit-button'
                            width='full'
                            isDisabled={!isStepValid()}
                        >
                            Зарегистрироваться
                        </Button>
                    </VStack>
                )}
            </form>
            <VerificationModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Registration;
