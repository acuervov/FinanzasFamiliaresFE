import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useCallback, useMemo, useRef, useState } from 'react';
import { movementTypeOptions } from '../../../../../data/movementTypeOptions';
import numbro from 'numbro';
import _ from 'lodash';
import moment from 'moment';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import useCategory from '../../../../../hooks/useCategories';

FilterService.register('custom_category', (value, filters) => {
    console.log('value', value, 'filters', filters);
    return filters ? filters === value.id : true;
});

const TransactionsList = ({ transactions, preview = true }) => {
    const { categories } = useCategory();

    const getAmountColor = useCallback((type) => {
        return movementTypeOptions.find((item) => item.value === type)?.color;
    }, []);

    const [filters, setFilters] = useState({
        category: { value: null, matchMode: FilterMatchMode.CUSTOM }
    });

    const categoryRowFilterTemplate = (options) => {
        console.log('options', options);
        return (
            <Dropdown
                value={options.value}
                options={categories}
                optionLabel="name"
                optionValue="id"
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Seleccione uno"
                className="p-column-filter"
                showClear
                style={{ minWidth: '12rem' }}
            />
        );
    };

    return (
        <DataTable dataKey="id" value={transactions} paginator={!preview} rows={preview ? 5 : 10} filters={filters}>
            <Column
                header="Descripción"
                field="date"
                sortable={!preview}
                body={(transaction) => (
                    <>
                        <span className="white-space-nowrap block font-semibold">{transaction.description}</span>
                        <span className="block text-color-secondary font-sm font-bold">{_.capitalize(moment(transaction.date).format('dddd DD h:mm'))}</span>
                    </>
                )}
            />
            <Column
                header="Categoria"
                field="category"
                body={(transaction) => <span className="white-space-nowrap p-2 surface-ground font-semibold">{transaction?.category?.name}</span>}
                filter={!preview}
                showFilterMatchModes={false}
                filterElement={categoryRowFilterTemplate}
            />
            {!preview && (
                <Column
                    header="Sub Categoria"
                    body={(transaction) => {
                        return transaction?.subCategory ? <span className="white-space-nowrap p-2 surface-ground font-semibold">{transaction?.subCategory}</span> : <></>;
                    }}
                />
            )}
            <Column
                header="Monto"
                field="amount"
                sortable={!preview}
                body={(transaction) => (
                    <span className={`white-space-nowrap block font-semibold text-lg  text-${getAmountColor(transaction.type)}`}>{numbro(transaction.amount).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                )}
            />
            {!preview && (
                <Column
                    body={() => (
                        <>
                            <Button
                                text
                                severity="secondary"
                                onClick={() => {
                                    console.log('show detail');
                                }}
                            >
                                <i
                                    className="pi pi-search-plus
"
                                ></i>
                            </Button>
                        </>
                    )}
                />
            )}
        </DataTable>
    );
};

export default TransactionsList;
