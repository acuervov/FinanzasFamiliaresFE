'use client';

import { useMountEffect } from 'primereact/hooks';
import useMovements from '../../../../../hooks/useMovements';
import TransactionsList from '../components/transactionsList';
import { useFinanzasStore } from '../../../../../store';

const Transactions = () => {
    const { movements } = useFinanzasStore((state) => state);

    return (
        <div className="card">
            <div className="surface-section px-4 pb-8 pt-2 md:px-6 lg:px-8">
                <div className="font-bold text-5xl text-900 mb-3">Lista de transacciones</div>
                <TransactionsList transactions={movements} preview={false} />
            </div>
        </div>
    );
};

export default Transactions;
