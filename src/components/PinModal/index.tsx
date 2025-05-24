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
    VStack,
} from '@chakra-ui/react';

import code from '~/assets/code.png';

type PinModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const PinModal = ({ isOpen, onClose }: PinModalProps) => {
    const onComplete = (str: string) => {
        console.log('str', str);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW='396px'>
                <ModalHeader display='flex' justifyContent='center'>
                    <Image src={code} />
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
                    <VStack spacing={4}>
                        <Text
                            color='blackAlpha.900'
                            fontSize='16px'
                            lineHeight='24px'
                            textAlign='center'
                        >
                            Мы отправили вам на e-mail{' '}
                            <b style={{ fontWeight: 600 }}>ekaterinabaker@gmail.ru</b> шестизначный
                            код. Введите его ниже.
                        </Text>

                        <HStack justifyContent='center'>
                            <PinInput otp onComplete={onComplete}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
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
    );
};

export default PinModal;
