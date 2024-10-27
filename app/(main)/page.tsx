'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { ProductService } from '../../demo/service/ProductService';
import { Demo } from '../../types/demo';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { client } from '../../service/amplifyConfig';
import moment from 'moment';

const metrics: Demo.Metric[] = [
    {
        title: 'Gastos',
        icon: 'pi pi-shopping-cart',
        color_light: '#64B5F6',
        color_dark: '#1976D2',
        amount: '10000'
    },
    {
        title: 'Ingresos',
        icon: 'pi pi-dollar',
        color_light: '#7986CB',
        color_dark: '#303F9F',
        amount: '10000'
    },
    {
        title: 'Transferencias',
        icon: 'pi pi-users',
        color_light: '#4DB6AC',
        color_dark: '#00796B',
        amount: '10000'
    },
    {
        title: 'Total',
        icon: 'pi pi-users',
        color_light: '#4DD0E1',
        color_dark: '#0097A7',
        amount: '10000'
    }
];

const Dashboard = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        ProductService.getProducts(client).then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const bodyTemplate = (data: Demo.Product, props: ColumnBodyOptions) => {
        return <>{data[props.field]}</>;
    };

    const priceBodyTemplate = (data: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(data.amount as number)}
            </>
        );
    };

    const dateBodyTemplate = (data: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Fecha</span>
                {moment(data.date as string).format('dddd MMM Do')}
            </>
        );
    };

    const categoryBodyTemplate = (data: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Categoria</span>
                {data.category.name as string}
            </>
        );
    };

    const rowClassName = (data: Demo.Product) => {
        const movementTypeColorMap = { purchase: 'bg-red-400', income: 'bg-green-400' };
        return movementTypeColorMap[data.type];
    };

    return (
        <div className="layout-dashboard">
            <div className="grid">
                {metrics.map((metric) => (
                    <div className="col-12 md:col-6 xl:col-3" key={metric.title}>
                        <div
                            className="card shadow-1 flex flex-column"
                            style={{
                                color: metric.color_light,
                                borderLeft: '4px solid'
                            }}
                        >
                            <div className="flex align-items-center">
                                <div className="flex justify-content-center align-items-center p-2 border-round" style={{ backgroundColor: metric.color_light }}>
                                    <i className={metric.icon} style={{ color: metric.color_dark }} />
                                </div>
                                <span className="text-xl ml-2 font-semibold" style={{ color: metric.color_light }}>
                                    {metric.title}
                                </span>
                                <div className={`col-6 flex flex-column p-3 text-center`}>
                                    <span className="text-color text-2xl font-semibold">{metric.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="flex justify-content-between">
                            <h4>Movimientos Recientes</h4>
                            {/* <Dropdown options={orderWeek} value={selectedOrderWeek} optionLabel="name" onChange={recentSales} style={{ width: '9rem' }}></Dropdown> */}
                        </div>

                        <p>Una lista de los ultimos 10 movimientos</p>

                        <DataTable value={products} paginator rows={5} rowClassName={rowClassName}>
                            <Column field="date" body={dateBodyTemplate} header="Fecha" sortable={true} style={{ width: '10%', minWidth: '6rem' }} />
                            <Column field="description" body={bodyTemplate} header="Descripción" sortable={true} style={{ width: '30%', minWidth: '10rem' }} />
                            <Column field="category" body={categoryBodyTemplate} header="Categoria" style={{ width: '30%', minWidth: '10rem' }} />
                            <Column field="amount" body={priceBodyTemplate} header="Valor" sortable={true} style={{ width: '20%', minWidth: '10rem' }} />
                            {/* <Column headerStyle={{ width: '10%', minWidth: '6rem' }} body={() => <Button icon="pi pi-search"></Button>} /> */}
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
