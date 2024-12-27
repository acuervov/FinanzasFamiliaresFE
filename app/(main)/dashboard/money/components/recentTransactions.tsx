import moment from 'moment';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Ripple } from 'primereact/ripple';
import { movementTypeOptions } from '../../../../../data/movementTypeOptions';
import { useCallback } from 'react';
import numbro from 'numbro';
import _ from 'lodash';

const RecentTransactions = ({ transactions }) => {
    const getAmountColor = useCallback((type) => {
        return movementTypeOptions.find((item) => item.value === type).color;
    }, []);
    return (
        <div className="h-full col-12 xl:col-8">
            <div className="card">
                <div className="flex flex-column md:flex-row md:justify-content-between align-items-center mb-2">
                    <h4 className="white-space-nowrap">Transacciones recientes</h4>
                    <Button label="Ver todas las transacciones" text disabled />
                    <Ripple />
                </div>

                <DataTable headerColumnGroup="none" value={transactions} rows={5} responsiveLayout="scroll">
                    <Column
                        body={(transaction) => (
                            <>
                                <span className="white-space-nowrap block font-semibold">{transaction.description}</span>
                                <span className="block text-color-secondary font-sm font-bold">{_.capitalize(moment(transaction.date).format('dddd DD h:mm'))}</span>
                            </>
                        )}
                    />
                    <Column body={(transaction) => <span className="white-space-nowrap p-2 surface-ground font-semibold">{transaction?.category?.name}</span>} />
                    <Column
                        body={(transaction) => (
                            <span className={`white-space-nowrap block font-semibold text-lg text-right text-${getAmountColor(transaction.type)}`}>
                                {numbro(transaction.amount).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}
                            </span>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default RecentTransactions;
