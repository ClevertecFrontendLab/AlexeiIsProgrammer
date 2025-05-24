import {
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import code from '~/assets/code.png';
import { APP_LOADER } from '~/constants/test-id';
import { useVerifyOtpMutation } from '~/query/services/auth';

import CustomSpinner from '../CustomSpinner';
import RecoveryModal from '../RecoveryModal';

type PinModalProps = {
    isOpen: boolean;
    onClose: () => void;
    email: string;
};

const PinModal = ({ isOpen, onClose, email }: PinModalProps) => {
    const {
        isOpen: isRecoveryModalOpen,
        onOpen: onRecoveryModalOpen,
        onClose: onRecoveryModalClose,
    } = useDisclosure();
    const toast = useToast();
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [pin, setPin] = useState('');

    const onComplete = (otpToken: string) => {
        verifyOtp({ otpToken, email })
            .then(() => {
                onClose();
                onRecoveryModalOpen();
            })
            .catch((e) => {
                const data = e?.data;

                setPin('');
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
                <ModalContent data-test-id='verification-code-modal' maxW='396px'>
                    {isLoading && <CustomSpinner data-test-id={APP_LOADER} spinnerOverflow />}
                    <ModalHeader display='flex' justifyContent='center'>
                        <Image src={code} />
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
                        <VStack spacing={4}>
                            <Text
                                color='blackAlpha.900'
                                fontSize='16px'
                                lineHeight='24px'
                                textAlign='center'
                            >
                                Мы отправили вам на e-mail{' '}
                                <b style={{ fontWeight: 600 }}>ekaterinabaker@gmail.ru</b>{' '}
                                шестизначный код. Введите его ниже.
                            </Text>

                            <HStack justifyContent='center'>
                                <PinInput onChange={setPin} value={pin} otp onComplete={onComplete}>
                                    <PinInputField data-test-id='verification-code-input-1' />
                                    <PinInputField data-test-id='verification-code-input-2' />
                                    <PinInputField data-test-id='verification-code-input-3' />
                                    <PinInputField data-test-id='verification-code-input-4' />
                                    <PinInputField data-test-id='verification-code-input-5' />
                                    <PinInputField data-test-id='verification-code-input-6' />
                                </PinInput>
                            </HStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent='center'>
                        <Text
                            color='blackAlpha.600'
                            fontSize='12px'
                            lineHeight='16px'
                            textAlign='center'
                        >
                            Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с
                            поддержкой
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <RecoveryModal
                email={email}
                isOpen={isRecoveryModalOpen}
                onClose={onRecoveryModalClose}
            />
        </>
    );
};

export default PinModal;
