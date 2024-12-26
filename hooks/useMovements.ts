import { useEffect, useMemo } from 'react';
import { client } from '../amplify/data/resource';
import { getMovements } from '../graphql/queries';
import { useFinanzasStore } from '../store';
import moment from 'moment';

const fetchMovements = async (query) => {
    const res = await client.graphql({
        query: getMovements,
        variables: { input: { ...query } }
    });

    console.log();

    return res?.data?.getMovements;
};

export default function useMovements() {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const { family, setMovements, movements } = useFinanzasStore((state) => state);

    useEffect(() => {
        updateMovementsInfo();
    }, [family]);

    const updateMovementsInfo = async () => {
        if (family.id) {
            const movements = (await fetchMovements({ familyId: family?.id, startDate: startOfMonth, endDate: endOfMonth }))?.items;
            setMovements(movements);
        }
    };

    const currentMonthIncomeMovements = useMemo(() => movements.filter((movement) => movement.type === 'income'), [movements]);
    const currentMonthTotalIncome = useMemo(
        () =>
            currentMonthIncomeMovements.reduce((total, current) => {
                return (total += current.amount);
            }, 0),
        [currentMonthIncomeMovements]
    );

    const currentMonthPurchaseMovements = useMemo(() => movements.filter((movement) => movement.type === 'purchase'), [movements]);
    const currentMonthTotalPurchase = useMemo(
        () =>
            currentMonthPurchaseMovements.reduce((total, current) => {
                return (total += current.amount);
            }, 0),
        [currentMonthPurchaseMovements]
    );

    return { incomeData: { currentMonthIncomeMovements, currentMonthTotalIncome }, purchaseData: { currentMonthPurchaseMovements, currentMonthTotalPurchase } };
}
