import { Card } from 'primereact/card';
import useCategories from '../../../../../hooks/useCategories';
import { useMemo } from 'react';
import _ from 'lodash';
import numbro from 'numbro';

interface CategoryExpensesItem {
    id: string;
    title: string;
    value: number;
    amount: number;
    background: string;
}

const CategoryExpenses = ({ allTotal = 0, movements }) => {
    const { categoryByType } = useCategories();

    const expenses = useMemo(() => {
        const categories = categoryByType('purchase');

        const categoriesMap: [CategoryExpensesItem] = categories.reduce((previous, current) => {
            previous[current.id] = {
                id: current.id,
                image: 'banking-4',
                title: current.name,
                value: 0,
                amount: 0,
                background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)'
            };
            return previous;
        }, {});

        movements.forEach((item) => {
            const categoryId = item.category?.id;
            const newAmount = categoriesMap[categoryId]?.amount + item?.amount;

            if (Object.hasOwn(categoriesMap, categoryId)) {
                categoriesMap[categoryId] = {
                    ...categoriesMap[categoryId],
                    amount: newAmount
                };
            }
        });

        const categoriesWithPercentage = Object.values(categoriesMap).map((item) => {
            if (_.isObject(item)) {
                return { ...item, value: (item?.amount / allTotal) * 100 };
            }
        });

        const sortedCategories = categoriesWithPercentage.sort((a, b) => {
            return b.value - a.value;
        });

        return sortedCategories;
    }, [categoryByType, movements, allTotal]);

    return (
        <div className="h-full col-12 xl:col-4">
            <Card className="h-full">
                <h4 className="white-space-nowrap mb-2">Gastos</h4>
                {expenses.map((expense) => (
                    <div key={expense.id} className="flex gap-3 w-full mt-4 align-items-center">
                        <div className="w-full">
                            <div className="flex flex-wrap w-full justify-content-between align-items-center">
                                <span className="font-semibold">{expense.title}</span>
                                <div className="flex">
                                    <span className="font-semibold text-color-secondary pr-2 border-right-2 surface-border text-sm">{numbro(expense.value).format({ mantissa: 2 })}%</span>
                                    <span className="font-semibold ml-2 text-sm">{numbro(expense.amount).formatCurrency().toUpperCase()}</span>
                                </div>
                            </div>
                            <div
                                className="border-round w-full overflow-hidden mt-2"
                                style={{
                                    height: '7px',
                                    backgroundColor: 'var(--surface-border)'
                                }}
                            >
                                <div
                                    className="border-left-round h-full"
                                    style={{
                                        background: expense.background,
                                        width: expense.value + '%'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default CategoryExpenses;
