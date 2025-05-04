import { Box, Spinner } from '@chakra-ui/react';

import styles from './CustomSpinner.module.scss';

type CustomSpinnerProps = {
    overflow?: boolean;
};

const CustomSpinner = ({ overflow }: CustomSpinnerProps) => (
    <Box className={overflow ? styles.overflow : undefined}>
        <Box className={styles.spinner}>
            <Spinner />
        </Box>
    </Box>
);

export default CustomSpinner;
