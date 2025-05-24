import {
    FieldValues,
    Path,
    RegisterOptions,
    useForm,
    UseFormProps,
    UseFormReturn,
} from 'react-hook-form';

export const useTrimForm = <TFieldValues extends FieldValues = FieldValues, TContext = null>(
    options?: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> => {
    const formMethods = useForm<TFieldValues, TContext>(options);
    const { register: originalRegister, setValue } = formMethods;

    const customRegister = (
        name: Path<TFieldValues>,
        registerOptions?: RegisterOptions<TFieldValues>,
    ) => {
        const { onBlur, ...rest } = originalRegister(name, registerOptions);

        return {
            ...rest,
            onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const target = e.target;
                const value = target.value;
                const tagName = target.tagName;
                const inputType = target.type;

                if (typeof value === 'string') {
                    let shouldTrim = false;

                    if (tagName === 'TEXTAREA') {
                        shouldTrim = true;
                    } else if (tagName === 'INPUT') {
                        shouldTrim = ['text', 'email', 'password', 'search', 'tel', 'url'].includes(
                            inputType,
                        );
                    }

                    if (shouldTrim) {
                        const trimmedValue = value.trim();
                        target.value = trimmedValue;
                        setValue(name, trimmedValue, { shouldValidate: true });
                    }
                }

                onBlur(e);
            },
        };
    };

    return {
        ...formMethods,
        register: customRegister,
    } as UseFormReturn<TFieldValues, TContext>;
};
