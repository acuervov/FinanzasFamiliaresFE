import { useEffect } from 'react';
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

    return res?.data?.getAccountsByUserGroups;
};

export default function useAccounts() {
    const { user, accounts, family, setAccounts } = useFinanzasStore((state) => state);

    useEffect(() => {
        setAccountsInfo();
    }, [family, user]);

    const setAccountsInfo = async () => {
        const users = family?.users?.map((user) => user.id) || [];

        if (users.length) {
            const accounts = await getAccountsInfo(users);
            setAccounts(accounts);
        }
    };

    const groupedAccountsOptions = family?.users?.map((user) => {
        const userAccounts = accounts?.filter((account) => account?.owner?.id === user.id).map((account) => ({ label: account.name, value: account.id }));
        return { label: user.name, code: user.id, items: userAccounts };
    });

    return { groupedAccountsOptions, setAccountsInfo };
}
