'use client';

import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { useFinanzasStore } from '../../../../store';
import useGetBalance from '../../../../hooks/useGetBalance';
import numbro from 'numbro';
import { Dialog } from 'primereact/dialog';
import CreateMovementForm from '../../../../components/forms/createMovement';
import Metrics from './components/metrics';
import useMovements from '../../../../hooks/useMovements';
import useAccounts from '../../../../hooks/useAccounts';
import CategoryExpenses from './components/categoryExpenses';
import RecentTransactions from './components/recentTransactions';
import AccountsTable from './components/accountsTable';

const Banking = () => {
    const [showMovementForm, setShowMovementForm] = useState(false);

    const { family, accounts, movements } = useFinanzasStore((state) => state);

    const { totalBalance } = useGetBalance(accounts);

    const { incomeData, purchaseData, currentMonthAllTotal } = useMovements(false);
    const { investmentsAllTotal, normalAccountsAllTotal } = useAccounts();
    return (
        <div className="layout-dashboard">
            {family.id ? (
                <div className="grid">
                    <div className="col-12 flex align-items-center justify-content-between flex-wrap gap-5">
                        <div className="flex justify-content-start align-items-center gap-4">
                            <div className="mx-auto sm:mx-0">
                                <span className="block text-xl font-semibold mb-2">Balance parcial</span>
                                <div className="flex align-items-center">
                                    <span className="font-semibold text-2xl">{numbro(normalAccountsAllTotal).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="mx-auto sm:mx-0">
                                <span className="block text-xl font-semibold mb-2">Balance mensual</span>
                                <div className="flex align-items-center">
                                    <span className="font-semibold text-2xl">{numbro(currentMonthAllTotal).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="mx-auto sm:mx-0">
                                <span className="block text-xl font-semibold mb-2">Balance total</span>
                                <div className="flex align-items-center">
                                    <span className="font-semibold text-2xl">{numbro(totalBalance).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto sm:mx-0">
                            <Button icon="pi pi-plus" iconPos="right" label="Añadir movimiento" severity="secondary" rounded onClick={() => setShowMovementForm(true)} />
                        </div>
                    </div>
                    <Metrics incomeData={incomeData} purchaseData={purchaseData} savingsData={{ investmentsAllTotal }} />

                    <RecentTransactions transactions={movements.slice(0, 5)} />
                    <CategoryExpenses allTotal={purchaseData.currentMonthTotalPurchase} movements={movements} />
                    <AccountsTable />
                </div>
            ) : (
                <div className="border-round border-1 surface-border p-4 surface-card">
                    <div className="flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="150px"></Skeleton>
                    <div className="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            )}
            <Dialog id="CreateMovementForm" visible={showMovementForm} header="Cree un nuevo movimiento" className="sm:w-10 lg:w-4" modal onHide={() => setShowMovementForm(false)}>
                <CreateMovementForm onSuccess={() => {}} />
            </Dialog>
        </div>
    );
};

export default Banking;
