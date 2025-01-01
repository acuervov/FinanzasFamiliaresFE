import { Button } from '@aws-amplify/ui-react';
import numbro from 'numbro';
import { useMemo } from 'react';

const Metrics = ({ incomeData, purchaseData, savingsData }) => {
    const metrics = useMemo(
        () => [
            {
                title: 'Gastos',
                total: purchaseData.currentMonthTotalPurchase,
                image: 'banking-3'
            },
            {
                title: 'Ingresos',
                total: incomeData.currentMonthTotalIncome,
                image: 'banking-2'
            },
            {
                title: 'Ahorros',
                total: savingsData.investmentsAllTotal,
                image: 'banking-1'
            }
        ],
        [incomeData, purchaseData, savingsData]
    );
    return (
        <>
            {metrics.map((metric, index) => (
                <div key={metric.title} className="col-12 md:col-4">
                    <div className="card flex w-full relative h-14rem overflow-hidden">
                        <div className="flex w-full justify-content-between p-1">
                            <div>
                                <span className="block white-space-nowrap font-semibold">{metric.title}</span>
                                <span className="block font-semibold text-xl mt-2 white-space-nowrap">{numbro(metric.total).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                            </div>
                        </div>
                        <img src={`/demo/images/dashboard/${metric.image}.svg`} className="absolute w-full bottom-0 left-0" alt="metric.image" />
                        {/* {hoveredIndex === index && (
                            <Button label="View Details" icon="pi pi-eye" iconPos="right" rounded severity="secondary" className="p-ripple fadeindown font-semibold absolute" style={{ borderRadius: '50px', left: '36%', bottom: '10%' }} />
                        )} */}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Metrics;
