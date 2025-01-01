'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { Ripple } from 'primereact/ripple';
import { ChartData, ChartOptions } from 'chart.js';
import { Skeleton } from 'primereact/skeleton';
import { useFinanzasStore } from '../../../../store';
import useGetBalance from '../../../../hooks/useGetBalance';
import numbro from 'numbro';
import { Dialog } from 'primereact/dialog';
import CreateMovementForm from '../../../../components/forms/createMovement';
import Metrics from './components/metrics';
import useMovements from '../../../../hooks/useMovements';
import useAccounts from '../../../../hooks/useAccounts';
import RecentTransactions from './components/recentTransactions';

const Banking = () => {
    const [showMovementForm, setShowMovementForm] = useState(false);

    const [barOptions, setBarOptions] = useState({});
    const [barData, setBarData] = useState({});
    const { layoutConfig } = useContext(LayoutContext);

    const { family, accounts, movements } = useFinanzasStore((state) => state);

    const { totalBalance } = useGetBalance(accounts);

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const menu = useRef(null);
    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };
    const showMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menu.current) {
            menu.current.show(event);
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    const items = [
        {
            label: 'View Details'
        },
        {
            label: 'Print Receipt'
        },
        {
            label: 'Hide'
        }
    ];

    const expenses = [
        {
            image: 'banking-4',
            title: 'Food',
            value: '79',
            amount: '$702.00',
            background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)'
        },
        {
            image: 'banking-5',
            title: 'Electronics',
            value: '62',
            amount: '$421.60',
            background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)'
        },
        {
            image: 'banking-6',
            title: 'Utilities',
            value: '45',
            amount: '$388.51',
            background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)'
        },
        {
            image: 'banking-7',
            title: 'Clothing',
            value: '41',
            amount: '$295.72',
            background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)'
        },
        {
            image: 'banking-8',
            title: 'Travel',
            value: '35',
            amount: '$170.05',
            background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)'
        },
        {
            image: 'banking-9',
            title: 'Subscriptions',
            value: '23',
            amount: '$96.80',
            background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)'
        }
    ];

    const initChart = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dee2e6';

        const barData: ChartData = {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
            datasets: [
                {
                    label: 'Revenue',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#2196f3',
                    barThickness: 12,
                    borderRadius: 12,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Expenses',
                    backgroundColor: '#FAB918',
                    barThickness: 12,
                    borderRadius: 12,
                    data: [35, 19, 40, 61, 16, 55, 30]
                }
            ]
        };

        const barOptions: ChartOptions = {
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: '700'
                        },
                        padding: 28
                    },
                    position: 'top'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: '500'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        callback(value) {
                            return '$' + value + 'k';
                        },
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setBarData(barData);
        setBarOptions(barOptions);
    };

    useEffect(() => {
        initChart();
    }, [layoutConfig]);

    const { incomeData, purchaseData, currentMonthAllTotal } = useMovements(false);
    const { investmentsAllTotal } = useAccounts();
    return (
        <div className="layout-dashboard">
            {family.id ? (
                <div className="grid">
                    <div className="col-12 flex align-items-center justify-content-between flex-wrap gap-5">
                        <div className="flex justify-content-start align-items-center gap-4">
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
                    {/* <div className="h-full col-12 xl:col-4">
                        <Card className="h-full">
                            <h4 className="white-space-nowrap mb-2">Expenses</h4>
                            {expenses.map((expense) => (
                                <div key={expense.title} className="flex gap-3 w-full mt-4 align-items-center">
                                    <img src={`/demo/images/dashboard/${expense.image}.svg`} alt={expense.title} className="w-3rem h-3rem" />
                                    <div className="w-full">
                                        <div className="flex flex-wrap w-full justify-content-between align-items-center">
                                            <span className="font-semibold">{expense.title}</span>
                                            <div className="flex">
                                                <span className="font-semibold text-color-secondary pr-2 border-right-2 surface-border text-sm">{expense.value}%</span>
                                                <span className="font-semibold ml-2 text-sm">{expense.amount}</span>
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

                    <div className="col-12 xl:col-6">
                        <div className="card h-full">
                            <div className="flex align-items-center">
                                <h4 className="white-space-nowrap mr-3 mb-0">Cards</h4>
                                <span className="w-2rem h-2rem flex justify-content-center align-items-center border-circle text-green-700 font-semibold" style={{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }}>
                                    2
                                </span>
                            </div>

                            <div className="grid flex-column sm:flex-row grid-nogutter border-round-xl mt-4">
                                <div className="col-12 sm:col-6 p-4 border-round-top-xl sm:border-noround-right sm:border-round-left-xl justify-content-between" style={{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }}>
                                    <span className="block text-xl font-semibold">Total Credit</span>
                                    <span className="block text-3xl font-semibold mt-3">
                                        $12,345
                                        <span className="text-xl font-semibold" style={{ color: 'rgba(77, 182, 172, 0.7)' }}>
                                            .67
                                        </span>
                                    </span>
                                </div>
                                <div className="col-12 sm:col-6 p-4 border-round-bottom-xl sm:border-noround-left sm:border-round-right-xl flex align-items-center justify-content-center sm:justify-content-end" style={{ backgroundColor: '#4DB6AC' }}>
                                    <Button label="View Details" icon="pi pi-eye font-semibold" iconPos="right" rounded severity="success" text className="p-ripple surface-section font-semibold" style={{ color: '#4DB6AC' }} />
                                </div>
                            </div>

                            <div className="grid grid-nogutter flex-column md:flex-row mt-4 gap-4">
                                <div className="col">
                                    <div
                                        className="card flex flex-column justify-content-between h-17rem bg-no-repeat bg-cover border-round-2xl shadow-none relative p-4 overflow-hidden"
                                        style={{
                                            backgroundImage: "url('/demo/images/dashboard/card-1.svg')"
                                        }}
                                    >
                                        <div className="flex w-full align-items-center">
                                            <img src={`/demo/images/dashboard/mastercard.svg`} alt="mastercard" className="w-4rem mr-2" />
                                            <span className="text-2xl font-semibold white-space-nowrap">Personal Card</span>
                                            <img src={`/demo/images/dashboard/chip.svg`} alt="mastercard" className="w-3rem ml-auto" />
                                        </div>
                                        <div className="flex justify-content-between">
                                            <span className="font-semibold white-space-nowrap">1234 1234 1234 1234</span>
                                            <span className="font-semibold">
                                                <span className="font-normal">Exp </span>12/23
                                            </span>
                                        </div>
                                        <div className="flex justify-content-between align-items-center mb-6">
                                            <span className="font-semibold">Limit</span>
                                            <div>
                                                <span className="font-bold px-2 border-right-2" style={{ color: '#4DB6AC', borderColor: '#4DB6AC' }}>
                                                    100%
                                                </span>
                                                <span className="font-bold ml-2"> $300.00 / $123.00</span>
                                            </div>
                                        </div>

                                        <span
                                            className="h-3rem w-8 absolute bottom-0 left-0"
                                            style={{
                                                borderBottomLeftRadius: '1rem',
                                                backgroundColor: 'rgba(77, 182, 172, 1)'
                                            }}
                                        ></span>
                                        <span
                                            className="h-3rem w-4 absolute bottom-0 left-0"
                                            style={{
                                                borderBottomRightRadius: '1rem',
                                                backgroundColor: 'rgba(77, 182, 172, 0.3)'
                                            }}
                                        ></span>
                                    </div>
                                </div>

                                <div className="col">
                                    <div
                                        className="card flex flex-column justify-content-between h-17rem bg-no-repeat bg-cover border-round-2xl shadow-none relative p-4 overflow-hidden"
                                        style={{
                                            backgroundImage: "url('/demo/images/dashboard/card-2.svg')"
                                        }}
                                    >
                                        <div className="flex w-full align-items-center">
                                            <img src={`/demo/images/dashboard/mastercard.svg`} alt="mastercard" className="w-4rem mr-2" />
                                            <span className="text-2xl font-semibold white-space-nowrap">Business Card</span>
                                            <img src={`/demo/images/dashboard/chip.svg`} alt="mastercard" className="w-3rem ml-auto" />
                                        </div>
                                        <div className="flex justify-content-between">
                                            <span className="font-semibold white-space-nowrap">1234 1234 1234 1234</span>
                                            <span className="font-semibold">
                                                <span className="font-normal">Exp </span>12/23
                                            </span>
                                        </div>
                                        <div className="flex justify-content-between align-items-center mb-6">
                                            <span className="font-semibold">Limit</span>
                                            <div>
                                                <span className="font-bold px-2 border-right-2" style={{ color: '#4DB6AC', borderColor: '#4DB6AC' }}>
                                                    100%
                                                </span>
                                                <span className="font-bold ml-2"> $300.00 / $123.00</span>
                                            </div>
                                        </div>
                                        <span
                                            className="h-3rem w-4 absolute bottom-0 left-0"
                                            style={{
                                                borderBottomLeftRadius: '1rem',
                                                backgroundColor: '#FAB710'
                                            }}
                                        ></span>
                                        <span
                                            className="h-3rem w-8 absolute bottom-0 right-0"
                                            style={{
                                                borderBottomRightRadius: '1rem',
                                                backgroundColor: 'rgba(250, 183, 16, 0.3)'
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <a className="p-ripple w-full border-1 border-dashed surface-border h-4rem border-round-xl mt-4 flex justify-content-center align-items-center cursor-pointer select-none">
                                <i className="pi pi-plus-circle text-xl mr-2 text-color-secondary"></i>
                                <span className="text-xl text-color-secondary">Add New Card</span>
                                <Ripple />
                            </a>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card">
                            <h4>Savings</h4>
                            <Chart type="bar" data={barData} options={barOptions} height="470"></Chart>
                        </div>
                    </div> */}
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
