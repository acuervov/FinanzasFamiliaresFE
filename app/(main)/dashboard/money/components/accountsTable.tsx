import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { useFinanzasStore } from '../../../../../store';
import { useEffect, useState } from 'react';
import numbro from 'numbro';
import { accountTypeOptions } from '../../../../../data/accountTypeOptions';
import { Button } from 'primereact/button';

const AccountsTable = () => {
    const [data, setData] = useState([]);

    const { family, accounts } = useFinanzasStore((state) => state);

    const getAccountTypeLabel = (value) => {
        return accountTypeOptions.find((item) => item.value === value)?.label || value;
    };

    useEffect(() => {
        if (family) {
            const { users } = family;
            const formatedData = users.map((item) => {
                const userAccounts = accounts.filter((account) => account.owner.id === item.id);
                const userAccountsFormatted = userAccounts.map((account) => {
                    return {
                        key: account.id,
                        data: {
                            name: account.name,
                            type: getAccountTypeLabel(account.type),
                            overAllTotal: numbro(account.overAllTotal).formatCurrency({ average: false, thousandSeparated: true })
                        }
                    };
                });
                return {
                    key: item.id,
                    data: {
                        name: item.name,
                        numberOfAccounts: userAccounts.length
                    },
                    children: userAccountsFormatted
                };
            });

            setData(formatedData);
        }
    }, [family, accounts]);

    const editBodyTemplate = (data) => {
        return data.children ? <></> : <Button icon="pi pi-pencil" />;
    };

    return (
        <div className="col-12">
            <div className="card">
                <h5>Cuentas</h5>
                <TreeTable value={data}>
                    <Column field="name" header="Usuario" expander />
                    <Column field="type" header="Tipo de cuenta" />
                    <Column field="overAllTotal" header="Saldo" />
                    <Column field="numberOfAccounts" header="Numero de cuentas" />
                    <Column headerStyle={{ width: '4rem' }} body={editBodyTemplate}></Column>
                </TreeTable>
            </div>
        </div>
    );
};

export default AccountsTable;
