import { useCallback, useEffect, useMemo } from 'react';
import { client } from '../amplify/data/resource';
import { getAccountsByUserGroups } from '../graphql/queries';
import { useFinanzasStore } from '../store';

const getAccountsInfo = async (ids) => {
    const res = await client.graphql({
        query: getAccountsByUserGroups,
        variables: {
            ids
        }
    });
    console.log();
    return res?.data?.getAccountsByUserGroups;
};

export default function useAccounts(loadAccounts = false) {
    const { user, accounts, family, setAccounts } = useFinanzasStore((state) => state);

    const setAccountsInfo = useCallback(async () => {
        const users = family?.users?.map((user) => user.id) || [];

        if (users.length) {
            const accounts = await getAccountsInfo(users);
            setAccounts(accounts);
        }
    }, [family, setAccounts]);

    useEffect(() => {
        if (loadAccounts) {
            setAccountsInfo();
        }
    }, [loadAccounts, family, user, setAccountsInfo]);

    const groupedAccountsOptions = useMemo(
        () =>
            family?.users?.map((user) => {
                const userAccounts = accounts?.filter((account) => account?.owner?.id === user.id).map((account) => ({ label: account.name, value: account.id }));
                return { label: user.name, code: user.id, items: userAccounts };
            }),
        [family, accounts]
    );

    const investmentsAccounts = useMemo(() => accounts.filter((account) => account.type === 'investment'), [accounts]);

    const investmentsAllTotal = useMemo(
        () =>
            investmentsAccounts.reduce((total, current) => {
                return (total += current.overAllTotal);
            }, 0),
        [investmentsAccounts]
    );

    const normalAccounts = useMemo(() => accounts.filter((account) => account.type !== 'investment'), [accounts]);
    const normalAccountsAllTotal = useMemo(
        () =>
            normalAccounts.reduce((total, current) => {
                return (total += current.overAllTotal);
            }, 0),
        [normalAccounts]
    );

    const getAccountById = useCallback(
        (id) => {
            return accounts.find((item) => item.id === id);
        },
        [accounts]
    );

    return { groupedAccountsOptions, setAccountsInfo, investmentsAllTotal, normalAccountsAllTotal, getAccountById };
}
