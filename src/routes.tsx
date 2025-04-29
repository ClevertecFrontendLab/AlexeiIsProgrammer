import { ReactElement } from 'react';
import { RouteObject } from 'react-router';

import App from '~/app/App.tsx';
import apple from '~/assets/sidebar/apple.svg';
import baby from '~/assets/sidebar/baby.svg';
import bread from '~/assets/sidebar/bread.svg';
import browser from '~/assets/sidebar/browser.svg';
import carrot from '~/assets/sidebar/carrot.svg';
import cup from '~/assets/sidebar/cup.svg';
import fish from '~/assets/sidebar/fish.svg';
import green from '~/assets/sidebar/green.svg';
import heal from '~/assets/sidebar/heal.svg';
import kastrulya from '~/assets/sidebar/kastrulya.svg';
import pan from '~/assets/sidebar/pan.svg';
import van from '~/assets/sidebar/van.svg';
import violet from '~/assets/sidebar/violet.svg';
import Tabbed from '~/components/Tabbed';

import Juciest from './components/Juciest';
import Subcategory from './components/Subcategory';
import Recipe from './pages/Recipe';
import flatten from './utils/flatten';

export type AppRoute = RouteObject & {
    icon?: string;
    path?: string;
    noMenu?: boolean;
    element?: ReactElement;
    index?: boolean;
    label?: string;
    children?: (RouteObject & AppRoute)[];
};

export const routes: AppRoute[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { label: 'Самое сочное', path: 'the-juiciest', element: <Juciest />, noMenu: true },
            // Салаты
            {
                path: 'salads',
                label: 'Салаты',
                icon: violet,
                element: <Tabbed />,
                children: [
                    { label: 'Мясные салаты', path: 'meat-salads', element: <Subcategory /> },
                    { label: 'Рыбные салаты', path: 'fish-salads', element: <Subcategory /> },
                    { label: 'Овощные салаты', path: 'vegetable-salads', element: <Subcategory /> },
                    { label: 'Теплые салаты', path: 'warm-salads', element: <Subcategory /> },
                ],
            },
            // Закуски
            {
                path: 'appetizers',
                label: 'Закуски',
                icon: apple,
                element: <Tabbed />,
                children: [
                    { label: 'Мясные закуски', path: 'meat-appetizers', element: <Subcategory /> },
                    { label: 'Рыбные закуски', path: 'fish-appetizers', element: <Subcategory /> },
                    {
                        label: 'Овощные закуски',
                        path: 'vegetable-appetizers',
                        element: <Subcategory />,
                    },
                    { label: 'Теплые закуски', path: 'warm-appetizers', element: <Subcategory /> },
                    { label: 'Бутерброды', path: 'sandwiches', element: <Subcategory /> },
                    { label: 'Фастфуд', path: 'fastfood', element: <Subcategory /> },
                ],
            },
            // Первые блюда
            {
                path: 'first-dish',
                label: 'Первые блюда',
                icon: kastrulya,
                element: <Tabbed />,
                children: [
                    { label: 'Мясные супы', path: 'meat-soups', element: <Subcategory /> },
                    { label: 'Овощные супы', path: 'vegetable-soups', element: <Subcategory /> },
                    { label: 'Бульоны', path: 'broths', element: <Subcategory /> },
                    { label: 'Холодные супы', path: 'cold-soups', element: <Subcategory /> },
                    { label: 'Диетические супы', path: 'diet-soups', element: <Subcategory /> },
                ],
            },
            // Вторые блюда
            {
                path: 'second-dish',
                label: 'Вторые блюда',
                icon: pan,
                element: <Tabbed />,
                children: [
                    { label: 'Мясные', path: 'meat-dishes', element: <Subcategory /> },
                    { label: 'Рыбные', path: 'fish-dishes', element: <Subcategory /> },
                    { label: 'Овощные', path: 'vegetable-dish', element: <Subcategory /> },
                    { label: 'Из птицы', path: 'poultry-dish', element: <Subcategory /> },
                    { label: 'Из грибов', path: 'mushroom-dish', element: <Subcategory /> },
                    { label: 'Из субпродуктов', path: 'offal-dish', element: <Subcategory /> },
                    { label: 'На пару', path: 'steamed-dishes', element: <Subcategory /> },
                    { label: 'Пельмени, вареники', path: 'dumplings', element: <Subcategory /> },
                    {
                        label: 'Мучные гарниры',
                        path: 'flour-side-dishes',
                        element: <Subcategory />,
                    },
                    {
                        label: 'Овощные гарниры',
                        path: 'vegetable-side-dishes',
                        element: <Subcategory />,
                    },
                    { label: 'Пицца', path: 'pizza', element: <Subcategory /> },
                    { label: 'Суши', path: 'sushi', element: <Subcategory /> },
                ],
            },
            // Десерты и выпечка
            {
                path: 'desserts-bakery',
                label: 'Десерты, выпечка',
                icon: bread,
                element: <Tabbed />,
                children: [
                    { label: 'Блины и оладьи', path: 'pancakes', element: <Subcategory /> },
                    { label: 'Пироги и пончики', path: 'pies-donuts', element: <Subcategory /> },
                    { label: 'Торты', path: 'cakes', element: <Subcategory /> },
                    { label: 'Рулеты', path: 'rolls', element: <Subcategory /> },
                    {
                        label: 'Кексы и маффины',
                        path: 'cupcakes-muffins',
                        element: <Subcategory />,
                    },
                    { label: 'Сырники и ватрушки', path: 'cheesecakes', element: <Subcategory /> },
                    { label: 'Из слоеного теста', path: 'puff-pastry', element: <Subcategory /> },
                    { label: 'Из заварного теста', path: 'choux-pastry', element: <Subcategory /> },
                    { label: 'Из дрожжевого теста', path: 'yeast-dough', element: <Subcategory /> },
                    { label: 'Булочки и сдоба', path: 'buns-pastries', element: <Subcategory /> },
                    { label: 'Хлеб', path: 'bread', element: <Subcategory /> },
                    { label: 'Тесто на пиццу', path: 'pizza-dough', element: <Subcategory /> },
                    { label: 'Кремы', path: 'creams', element: <Subcategory /> },
                ],
            },
            // Блюда на гриле
            {
                path: 'grill',
                label: 'Блюда на гриле',
                icon: van,
                element: <Tabbed />,
                children: [
                    { label: 'Говядина', path: 'beef-grill', element: <Subcategory /> },
                    { label: 'Свинина', path: 'pork-grill', element: <Subcategory /> },
                    { label: 'Птица', path: 'poultry-grill', element: <Subcategory /> },
                    { label: 'Рыба', path: 'fish-grill', element: <Subcategory /> },
                    { label: 'Грибы', path: 'mushroom-grill', element: <Subcategory /> },
                    { label: 'Овощи', path: 'vegetable-grill', element: <Subcategory /> },
                ],
            },
            // Веганская кухня
            {
                path: 'vegan',
                label: 'Веганская кухня',
                icon: green,
                element: <Tabbed />,
                children: [
                    { label: 'Закуски', path: 'snacks', element: <Subcategory /> },
                    { label: 'Первые блюда', path: 'first-dish', element: <Subcategory /> },
                    { label: 'Вторые блюда', path: 'second-dish', element: <Subcategory /> },
                    { label: 'Гарниры', path: 'garniry', element: <Subcategory /> },
                    { label: 'Десерты', path: 'deserty', element: <Subcategory /> },
                    { label: 'Выпечка', path: 'vypechka', element: <Subcategory /> },
                    {
                        label: 'Сыроедческие блюда',
                        path: 'syroedcheskie-blyuda',
                        element: <Subcategory />,
                    },
                    { label: 'Напитки', path: 'napitki', element: <Subcategory /> },
                ],
            },
            // Детские блюда
            {
                path: 'kids-meals',
                label: 'Детские блюда',
                icon: baby,
                element: <Tabbed />,
                children: [
                    { label: 'Первые блюда', path: 'kids-first-dish', element: <Subcategory /> },
                    { label: 'Вторые блюда', path: 'kids-second-dish', element: <Subcategory /> },
                    { label: 'Гарниры', path: 'kids-side-dishes', element: <Subcategory /> },
                    { label: 'Выпечка', path: 'kids-bakery', element: <Subcategory /> },
                    { label: 'Без глютена', path: 'kids-gluten-free', element: <Subcategory /> },
                    { label: 'Без сахара', path: 'kids-sugar-free', element: <Subcategory /> },
                    {
                        label: 'Без аллергенов',
                        path: 'kids-allergen-free',
                        element: <Subcategory />,
                    },
                    { label: 'Блюда для прикорма', path: 'baby-food', element: <Subcategory /> },
                ],
            },
            // Лечебное питание
            {
                path: 'therapeutic-nutrition',
                label: 'Лечебное питание',
                icon: heal,
                element: <Tabbed />,
                children: [
                    { label: 'Детская диета', path: 'kids-diet', element: <Subcategory /> },
                    { label: 'Диета №1', path: 'diet-1', element: <Subcategory /> },
                    { label: 'Диета №2', path: 'diet-2', element: <Subcategory /> },
                    { label: 'Диета №3', path: 'diet-3', element: <Subcategory /> },
                    { label: 'Диета №5', path: 'diet-5', element: <Subcategory /> },
                    { label: 'Диета №6', path: 'diet-6', element: <Subcategory /> },
                    { label: 'Диета №7', path: 'diet-7', element: <Subcategory /> },
                    { label: 'Диета №8', path: 'diet-8', element: <Subcategory /> },
                    { label: 'Диета №9', path: 'diet-9', element: <Subcategory /> },
                    { label: 'Диета №10', path: 'diet-10', element: <Subcategory /> },
                    { label: 'Диета №11', path: 'diet-11', element: <Subcategory /> },
                    { label: 'Диета №12', path: 'diet-12', element: <Subcategory /> },
                    { label: 'Диета №13', path: 'diet-13', element: <Subcategory /> },
                    { label: 'Диета №14', path: 'diet-14', element: <Subcategory /> },
                    { label: 'Без глютена', path: 'gluten-free', element: <Subcategory /> },
                    { label: 'Без аллергенов', path: 'allergen-free', element: <Subcategory /> },
                ],
            },
            // Национальные блюда
            {
                path: 'national-cuisines',
                label: 'Национальные',
                icon: browser,
                element: <Tabbed />,
                children: [
                    { label: 'Американская кухня', path: 'american', element: <Subcategory /> },
                    { label: 'Армянская кухня', path: 'armenian', element: <Subcategory /> },
                    { label: 'Греческая кухня', path: 'greek', element: <Subcategory /> },
                    { label: 'Грузинская кухня', path: 'georgian', element: <Subcategory /> },
                    { label: 'Итальянская кухня', path: 'italian', element: <Subcategory /> },
                    { label: 'Испанская кухня', path: 'spanish', element: <Subcategory /> },
                    { label: 'Китайская кухня', path: 'chinese', element: <Subcategory /> },
                    { label: 'Мексиканская кухня', path: 'mexican', element: <Subcategory /> },
                    { label: 'Паназиатская кухня', path: 'pan-asian', element: <Subcategory /> },
                    { label: 'Русская кухня', path: 'russian', element: <Subcategory /> },
                    { label: 'Турецкая кухня', path: 'turkish', element: <Subcategory /> },
                    { label: 'Французская кухня', path: 'french', element: <Subcategory /> },
                    { label: 'Шведская кухня', path: 'swedish', element: <Subcategory /> },
                    { label: 'Японская кухня', path: 'japanese', element: <Subcategory /> },
                    { label: 'Другая кухня', path: 'other-cuisines', element: <Subcategory /> },
                ],
            },
            // Соусы
            {
                path: 'sauces',
                label: 'Соусы',
                icon: fish,
                element: <Tabbed />,
                children: [
                    { label: 'Соусы мясные', path: 'meat-sauces', element: <Subcategory /> },
                    { label: 'Соусы сырные', path: 'cheese-sauces', element: <Subcategory /> },
                    { label: 'Маринады', path: 'marinades', element: <Subcategory /> },
                ],
            },
            // Напитки
            {
                path: 'drinks',
                label: 'Напитки',
                icon: cup,
                element: <Tabbed />,
                children: [
                    { label: 'Соки и фреши', path: 'juices', element: <Subcategory /> },
                    { label: 'Смузи', path: 'smoothies', element: <Subcategory /> },
                    { label: 'Компоты', path: 'compotes', element: <Subcategory /> },
                    { label: 'Кисели', path: 'kissels', element: <Subcategory /> },
                    { label: 'Кофе', path: 'coffee', element: <Subcategory /> },
                    { label: 'Лечебный чай', path: 'medicinal-tea', element: <Subcategory /> },
                    { label: 'Квас', path: 'kvass', element: <Subcategory /> },
                    { label: 'Коктейли', path: 'cocktails', element: <Subcategory /> },
                    { label: 'Алкогольные', path: 'alcoholic', element: <Subcategory /> },
                ],
            },
            // Заготовки
            {
                path: 'preserves',
                label: 'Заготовки',
                icon: carrot,
                element: <Tabbed />,
                children: [
                    { label: 'Мясные заготовки', path: 'meat-preserves', element: <Subcategory /> },
                    { label: 'Рыбные заготовки', path: 'fish-preserves', element: <Subcategory /> },
                    { label: 'Из огурцов', path: 'cucumber-preserves', element: <Subcategory /> },
                    { label: 'Из томатов', path: 'tomato-preserves', element: <Subcategory /> },
                    { label: 'Из грибов', path: 'mushroom-preserves', element: <Subcategory /> },
                    {
                        label: 'Овощные заготовки',
                        path: 'vegetable-preserves',
                        element: <Subcategory />,
                    },
                    { label: 'Салаты, икра', path: 'salads-caviar', element: <Subcategory /> },
                    {
                        label: 'Из фруктов и ягод',
                        path: 'fruit-berry-preserves',
                        element: <Subcategory />,
                    },
                ],
            },
        ],
    },
    {
        path: '/:category/:subcategory/:id',
        element: <Recipe />,
    },
];

export const flattenRoutes = flatten(routes);
