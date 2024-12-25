export default function useGetCategoryOptions(categories) {
    const categoryByType = (type) => {
        return categories.filter((category) => category.type === type);
    };

    const getSubCategoriesByCategory = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        return category?.subCategories;
    };

    return { categoryByType, getSubCategoriesByCategory };
}
