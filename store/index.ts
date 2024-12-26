import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';

type UserSlice = {
    user: any;
    setUser: (user: any) => void;
};

type FamilySlice = {
    family: any;
    setFamily: (family: any) => void;
};

type AccountsSlice = {
    accounts: any;
    setAccounts: (accounts: any) => void;
};

type MovementsSlice = {
    movements: any;
    setMovements: (movements: any) => void;
};

type FinanzasStore = UserSlice & FamilySlice & AccountsSlice & MovementsSlice;

const createUserSlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], UserSlice> = (set) => ({
    user: {},
    setUser: (user) => set((state) => ({ user: _.cloneDeep(user) }), undefined, 'finanzas:user/setUser')
});

const createFamilySlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], FamilySlice> = (set) => ({
    family: {},
    setFamily: (family) => set((state) => ({ family: family }), undefined, 'finanzas:family/setFamily')
});

const createAccountsSlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], AccountsSlice> = (set) => ({
    accounts: [],
    setAccounts: (accounts) => set((state) => ({ accounts: [...accounts] }), undefined, 'finanzas:accounts/setAccounts')
});

const createMovementsSlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], MovementsSlice> = (set) => ({
    movements: [],
    setMovements: (movements) => set((state) => ({ movements: [...movements] }), undefined, 'finanzas:movements/setMovements')
});

export const useFinanzasStore = create<FinanzasStore>()(
    devtools((...args) => ({
        ...createUserSlice(...args),
        ...createFamilySlice(...args),
        ...createAccountsSlice(...args),
        ...createMovementsSlice(...args)
    }))
);
