import _ from 'lodash';
import { useFinanzasStore } from '../store';

export default function useCategory() {
    const { categories } = useFinanzasStore((state) => state.family);

    const categoryByType = (type) => {
        const unorderCategories = categories
            .filter((category) => category.type === type)
            ?.sort((a, b) => {
                return a.name - b.name;
            });

        return _.orderBy(unorderCategories, ['name'], ['asc']);
    };

    const getSubCategoriesByCategory = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        return category?.subCategories;
    };

    const categoryById = (id) => {
        return categories.find((category) => category.id === id);
    };

    return { categoryByType, getSubCategoriesByCategory, categoryById, categories };
}
