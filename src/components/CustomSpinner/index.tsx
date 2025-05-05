import { Box, BoxProps, Spinner } from '@chakra-ui/react';

import styles from './CustomSpinner.module.scss';

type CustomSpinnerProps = BoxProps & {
    spinnerOverflow?: boolean;
};

const CustomSpinner = ({ spinnerOverflow, ...props }: CustomSpinnerProps) => (
    <Box {...props} className={spinnerOverflow ? styles.overflow : undefined}>
        <Box className={styles.spinner}>
            <Spinner />
        </Box>
    </Box>
);

export default CustomSpinner;
