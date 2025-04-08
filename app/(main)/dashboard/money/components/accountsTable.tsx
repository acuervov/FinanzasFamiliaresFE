import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { useFinanzasStore } from '../../../../../store';
import { useCallback, useEffect, useState } from 'react';
import numbro from 'numbro';
import { accountTypeOptions } from '../../../../../data/accountTypeOptions';
import { Button } from 'primereact/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog } from 'primereact/dialog';
import CreateAccountForm from '../../../../../components/forms/createAccount';

const AccountsTable = () => {
    const [data, setData] = useState([]);
    const [showAccountForm, setShowAccountForm] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
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

    const createDetailQueryAndUpdate = useCallback(
        (id: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set('accountDetail', id);

            const query = params.toString();
            router.push(`/dashboard/money?${query}`);
        },
        [searchParams, router]
    );

    const editBodyTemplate = (data) => {
        return data.children ? <></> : <Button icon="pi pi-pencil" onClick={() => createDetailQueryAndUpdate(data.key)} />;
    };

    useEffect(() => {
        if (searchParams.get('accountDetail')) {
            setShowAccountForm(true);
        }
    }, [searchParams]);

    const closeEditAccount = () => {
        setShowAccountForm(false);
        const params = new URLSearchParams(searchParams.toString());

        params.delete('accountDetail');

        const query = params.toString();
        router.push(`/dashboard/money?${query}`);
    };

    return (
        <>
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
            <Dialog id="CreateAccountForm" visible={showAccountForm} header="Edite la cuenta" className="sm:w-10 lg:w-4" modal onHide={closeEditAccount}>
                <CreateAccountForm onSuccess={() => {}} />
            </Dialog>
        </>
    );
};

export default AccountsTable;
