import {
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import wrong from '~/assets/wrong.png';

type WrongVerificationModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const WrongVerificationModal = ({ isOpen, onClose }: WrongVerificationModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-test-id='email-verification-failed-modal' maxW='396px'>
            <ModalHeader display='flex' justifyContent='center'>
                <Image src={wrong} />
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
                    fontWeight={700}
                    color='black'
                    fontSize='24px'
                    lineHeight='32px'
                    textAlign='center'
                >
                    Упс! Что-то пошло не так
                </Text>
                <Text color='blackAlpha.700' fontSize='16px' lineHeight='24px' textAlign='center'>
                    Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                    снова.
                </Text>
            </ModalBody>

            <ModalFooter justifyContent='center'>
                <Text color='blackAlpha.600' fontSize='12px' lineHeight='16px' textAlign='center'>
                    Остались вопросы? Свяжитесь с поддержкой
                </Text>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default WrongVerificationModal;
