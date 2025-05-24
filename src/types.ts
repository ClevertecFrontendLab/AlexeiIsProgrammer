export type Comment = {
    id: string;
    author: string;
    authorInitials: string;
    time: string;
    text: string;
    rating: number;
};

export type Step = {
    stepNumber: number;
    image?: string;
    description: string;
};

export type Ingredient = {
    title: string;
    count?: string;
    measureUnit: string;
};

export type NutritionValue = {
    calories: number;
    proteins?: number;
    protein?: number;
    fats: number;
    carbohydrates: number;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image: string;
};

export type Author = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers: string[];
};

export type Recipe = {
    _id: string;
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds?: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    authorData: Author;
};

export type OptionType = { label: string; value: string; isCustom?: boolean };

export type RegistrationFormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

export type LoginFormData = {
    login: string;
    password: string;
};

export type EmailFormData = {
    email: string;
};

export type RecoveryFormData = {
    login: string;
    password: string;
    passwordConfirm: string;
    email: string;
};
