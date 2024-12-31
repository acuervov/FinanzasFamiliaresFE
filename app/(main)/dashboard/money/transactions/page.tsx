'use client';

import useMovements from '../../../../../hooks/useMovements';
import TransactionsList from '../components/transactionsList';
import { useFinanzasStore } from '../../../../../store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import _ from 'lodash';

const Transactions = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { movements, family } = useFinanzasStore((state) => state);
    const { getMonthBoundaries, updateMovementsInfo } = useMovements();

    const [month, setMonth] = useState(moment().format('MMMM'));
    const [year, setYear] = useState(moment().year());

    const yearOptions = useMemo(() => {
        const currentYear = moment().year();
        const timeSpan = 10;
        const years = Array.from({ length: timeSpan }, (_, i) => currentYear - i);
        return years;
    }, []);

    const monthOptions = useMemo(() => {
        const months = moment.months();
        return months.map((item) => ({ label: _.capitalize(item), value: item }));
    }, []);

    const createDateQueryString = useCallback(
        (startDate, endDate) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('startDate', startDate);
            params.set('endDate', endDate);

            return params.toString();
        },
        [searchParams]
    );

    const updateMonthQuery = useCallback(
        async (e) => {
            setLoading(true);
            setMonth(e.value);
            const boundaries = getMonthBoundaries(moment().month(e.value).year(year));

            router.push(`/dashboard/money/transactions?${createDateQueryString(boundaries.startOfMonth.toISOString(), boundaries.endOfMonth.toISOString())}`);
        },
        [router, createDateQueryString, getMonthBoundaries, year]
    );

    const updateYearQuery = useCallback(
        async (e) => {
            setLoading(true);
            setYear(e.value);
            const boundaries = getMonthBoundaries(moment().year(e.value).month(month));

            router.push(`/dashboard/money/transactions?${createDateQueryString(boundaries.startOfMonth.toISOString(), boundaries.endOfMonth.toISOString())}`);
        },
        [router, createDateQueryString, getMonthBoundaries, month]
    );

    useEffect(() => {
        const fetchMovements = async () => {
            await updateMovementsInfo({
                familyId: family?.id,
                startDate: new Date(searchParams.get('startDate')),
                endDate: new Date(searchParams.get('endDate'))
            });
            setLoading(false);
        };
        if (searchParams.size) {
            fetchMovements();
        }
    }, [searchParams, updateMovementsInfo, family]);

    return (
        <div className="card">
            <div className="surface-section px-4 pb-8 pt-2 md:px-6 lg:px-8">
                <div className="font-bold text-5xl text-900 mb-3">Lista de transacciones</div>
                <div className="p-fluid">
                    <div className="formgrid grid gap-5">
                        <div className="field w-2 d-flex flex-column">
                            <label htmlFor="month">Mes</label>
                            <Dropdown id="month" type="text" value={month} onChange={updateMonthQuery} options={monthOptions} />
                        </div>
                        <div className="field w-1 d-flex flex-column">
                            <label htmlFor="year">Año</label>
                            <Dropdown id="year" type="text" value={year} onChange={updateYearQuery} options={yearOptions} />
                        </div>
                    </div>
                </div>
                <TransactionsList transactions={movements} preview={false} loading={loading} />
            </div>
        </div>
    );
};

export default Transactions;
