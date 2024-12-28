'use client';

import { useMountEffect } from 'primereact/hooks';
import useMovements from '../../../../../hooks/useMovements';
import TransactionsList from '../components/transactionsList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFinanzasStore } from '../../../../../store';
import { Paginator } from 'primereact/paginator';

const Transactions = () => {
    const { movements } = useFinanzasStore((state) => state);

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const movementsToShow = useMemo(() => {
        return movements.slice(first, first + rows);
    }, [movements, first, rows]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="card">
            <div className="surface-section px-4 pb-8 pt-2 md:px-6 lg:px-8">
                <div className="font-bold text-5xl text-900 mb-3">Lista de transacciones</div>
                <TransactionsList transactions={movementsToShow} header={false} />
                <Paginator first={first} rows={rows} totalRecords={movements.length} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </div>
        </div>
    );
};

export default Transactions;
