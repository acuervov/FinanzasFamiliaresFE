import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import TransactionsList from './transactionsList';

const RecentTransactions = ({ transactions }) => {
    const router = useRouter();

    return (
        <div className="h-full col-12 xl:col-8">
            <div className="card">
                <div className="flex flex-column md:flex-row md:justify-content-between align-items-center mb-2">
                    <h4 className="white-space-nowrap">Transacciones recientes</h4>
                    <Button
                        label="Ver todas las transacciones"
                        text
                        onClick={() => {
                            router.push('/dashboard/money/transactions');
                        }}
                    />
                    <Ripple />
                </div>
                <TransactionsList transactions={transactions} />
            </div>
        </div>
    );
};

export default RecentTransactions;
