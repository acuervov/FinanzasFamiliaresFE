import { useFinanzasStore } from '../store';

export default function useCategory() {
    const { categories } = useFinanzasStore((state) => state.family);

    const categoryByType = (type) => {
        return categories.filter((category) => category.type === type);
    };

    const getSubCategoriesByCategory = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        return category?.subCategories;
    };

    const categoryById = (id) => {
        return categories.find((category) => category.id === id);
    };

    return { categoryByType, getSubCategoriesByCategory, categoryById };
}
