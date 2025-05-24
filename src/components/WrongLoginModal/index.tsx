import {
    Button,
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

import coffee from '~/assets/coffee.png';

type WrongLoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
};

const WrongLoginModal = ({ isOpen, onClose, onClick }: WrongLoginModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-test-id='sign-in-error-modal' gap='20px' maxW='396px'>
            <ModalHeader display='flex' justifyContent='center'>
                <Image src={coffee} />
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
                    Вход не выполнен
                </Text>

                <Text color='blackAlpha.900' fontSize='16px' lineHeight='24px' textAlign='center'>
                    Что-то пошло не так. Попробуйте еще раз
                </Text>

                <Button
                    data-test-id='repeat-button'
                    colorScheme='blackAlpha'
                    type='button'
                    onClick={onClick}
                    width='full'
                >
                    Повторить
                </Button>
            </ModalBody>

            <ModalFooter justifyContent='center'>
                <Text color='blackAlpha.600' fontSize='12px' lineHeight='16px' textAlign='center'>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default WrongLoginModal;
