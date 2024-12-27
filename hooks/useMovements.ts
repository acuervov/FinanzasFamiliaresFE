import { useCallback, useEffect, useMemo } from 'react';
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

export default function useMovements(loadMovements = false) {
    const startOfMonth = useMemo(() => moment().startOf('month').toDate(), []);
    const endOfMonth = useMemo(() => moment().endOf('month').toDate(), []);

    const { family, setMovements, movements } = useFinanzasStore((state) => state);

    const updateMovementsInfo = useCallback(async () => {
        const movements = (await fetchMovements({ familyId: family?.id, startDate: startOfMonth, endDate: endOfMonth }))?.items;
        setMovements(movements);
    }, [setMovements, family, startOfMonth, endOfMonth]);

    useEffect(() => {
        if (loadMovements && family.id) {
            updateMovementsInfo();
        }
    }, [family, updateMovementsInfo, loadMovements]);

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

    const currentMonthAllTotal = useMemo(() => currentMonthTotalIncome - currentMonthTotalPurchase, [currentMonthTotalIncome, currentMonthTotalPurchase]);

    const orderedMonthMovements = useMemo(
        () =>
            movements.sort(function (left, right) {
                return moment.utc(right.date).diff(moment.utc(left.date));
            }),
        [movements]
    );

    return { incomeData: { currentMonthIncomeMovements, currentMonthTotalIncome }, purchaseData: { currentMonthPurchaseMovements, currentMonthTotalPurchase }, currentMonthAllTotal, orderedMonthMovements, updateMovementsInfo };
}
