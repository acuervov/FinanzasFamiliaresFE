import { useCallback, useEffect, useMemo } from 'react';
import { client } from '../amplify/data/resource';
import { getMovement, getMovements } from '../graphql/queries';
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

const fetchMovementById = async (id) => {
    const res = await client.graphql({
        query: getMovement,
        variables: { id }
    });

    console.log();

    return res?.data?.getMovement;
};

export default function useMovements(loadMovements = false) {
    const { family, setMovements, movements } = useFinanzasStore((state) => state);

    const getMonthBoundaries = useCallback((date = {}) => {
        const startOfMonth = moment(date).startOf('month').toDate();
        const endOfMonth = moment(date).endOf('month').toDate();

        return { startOfMonth, endOfMonth };
    }, []);

    const updateMovementsInfo = useCallback(
        async (query = { familyId: family?.id, startDate: getMonthBoundaries().startOfMonth, endDate: getMonthBoundaries().endOfMonth }) => {
            const movements = (await fetchMovements(query))?.items;
            setMovements(movements);
        },
        [setMovements, family, getMonthBoundaries]
    );

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

    const getMovementById = useCallback(
        async (id: string) => {
            let movement = movements.find((item) => item.id === id);
            if (movement) {
                return movement;
            } else {
                movement = await fetchMovementById(id);
                return movement;
            }
        },
        [movements]
    );
    return {
        incomeData: { currentMonthIncomeMovements, currentMonthTotalIncome },
        purchaseData: { currentMonthPurchaseMovements, currentMonthTotalPurchase },
        currentMonthAllTotal,
        orderedMonthMovements,
        updateMovementsInfo,
        fetchMovements,
        getMonthBoundaries,
        getMovementById
    };
}
