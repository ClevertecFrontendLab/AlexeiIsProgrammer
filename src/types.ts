export interface Comment {
    id: string;
    author: string;
    authorInitials: string;
    time: string;
    text: string;
    rating: number;
}

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
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image: string;
};

export type RecipeType = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    meat?: string;
    side?: string;
};
