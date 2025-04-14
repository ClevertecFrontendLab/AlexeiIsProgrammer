export interface Recipe {
    id: string;
    title: string;
    image: string;
    time: string;
    rating: number;
    author: string;
    authorAvatar?: string;
    description: string;
    isFavorite?: boolean;
    comments?: number;
    servings?: number;
    difficulty?: string;
    ingredients?: string[];
    steps?: string[];
    tags?: string[];
}

export interface Comment {
    id: string;
    author: string;
    authorInitials: string;
    time: string;
    text: string;
    rating: number;
}
