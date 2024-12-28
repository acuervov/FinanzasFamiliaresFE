import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useCallback, useMemo, useRef } from 'react';
import { movementTypeOptions } from '../../../../../data/movementTypeOptions';
import numbro from 'numbro';
import _ from 'lodash';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const TransactionsList = ({ transactions, header }) => {
    const getAmountColor = useCallback((type) => {
        return movementTypeOptions.find((item) => item.value === type)?.color;
    }, []);

    const menu = useRef(null);

    const showMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menu.current) {
            menu.current.show(event);
        }
    };

    const menuItems = [
        {
            label: 'Ver detalles'
        }
    ];

    const tableHeader = useMemo(() => (header ? header : false), [header]);
    return (
        <DataTable dataKey="id" value={transactions} header={tableHeader}>
            <Column
                header="Descripción"
                body={(transaction) => (
                    <>
                        <span className="white-space-nowrap block font-semibold">{transaction.description}</span>
                        <span className="block text-color-secondary font-sm font-bold">{_.capitalize(moment(transaction.date).format('dddd DD h:mm'))}</span>
                    </>
                )}
            />
            <Column header="Categoria" body={(transaction) => <span className="white-space-nowrap p-2 surface-ground font-semibold">{transaction?.category?.name}</span>} />
            <Column
                header="Monto"
                body={(transaction) => (
                    <span className={`white-space-nowrap block font-semibold text-lg  text-${getAmountColor(transaction.type)}`}>{numbro(transaction.amount).formatCurrency({ mantissa: 1, optionalMantissa: true, average: true }).toUpperCase()}</span>
                )}
            />
            {/* <Column
                body={() => (
                    <>
                        <Button text severity="secondary" onClick={showMenu}>
                            <i className="pi pi-ellipsis-v"></i>
                        </Button>
                        <Menu ref={menu} model={menuItems} popup={true}></Menu>
                    </>
                )}
            /> */}
        </DataTable>
    );
};

export default TransactionsList;
