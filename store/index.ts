import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type FishSlice = {
    fishes: number;
    addFish: () => void;
};

type UserSlice = {
    user: any;
    setUser: (user: any) => void;
};

type FinanzasStore = FishSlice & UserSlice;

const createUserSlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], UserSlice> = (set) => ({
    user: {},
    setUser: (user) => set((state) => ({ user: user }), undefined, 'finanzas:user/setUser')
});

const createFishSlice: StateCreator<FinanzasStore, [['zustand/devtools', never]], [], FishSlice> = (set) => ({
    fishes: 0,
    addFish: () => set((state) => ({ fishes: state.fishes + 1 }), undefined, 'jungle:fish/addFish')
});

export const useFinanzasStore = create<FinanzasStore>()(
    devtools((...args) => ({
        ...createUserSlice(...args),
        ...createFishSlice(...args)
    }))
);
