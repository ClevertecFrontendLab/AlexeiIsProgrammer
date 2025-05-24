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

import verification from '~/assets/verification.png';

type VerificationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    email: string;
};

const VerificationModal = ({ email, isOpen, onClose }: VerificationModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-test-id='sign-up-success-modal' maxW='396px'>
            <ModalHeader display='flex' justifyContent='center'>
                <Image src={verification} />
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
                <Text
                    fontWeight={700}
                    color='black'
                    fontSize='24px'
                    lineHeight='32px'
                    textAlign='center'
                >
                    Остался последний шаг. Нужно верифицировать ваш e-mail
                </Text>
                <Text color='blackAlpha.900' fontSize='16px' lineHeight='24px' textAlign='center'>
                    Мы отправили вам на почту <b style={{ fontWeight: 600 }}>{email}</b> ссылку для
                    верификации.
                </Text>
            </ModalBody>

            <ModalFooter justifyContent='center'>
                <Text color='blackAlpha.600' fontSize='12px' lineHeight='16px' textAlign='center'>
                    Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с
                    поддержкой
                </Text>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default VerificationModal;
