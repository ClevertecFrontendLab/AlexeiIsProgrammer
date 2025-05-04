const clearEmptyParams = (params: Record<string, unknown>) =>
    Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) =>
                value !== undefined &&
                value !== null &&
                value !== '' &&
                !(Array.isArray(value) && value.length === 0),
        ),
    );

export default clearEmptyParams;
