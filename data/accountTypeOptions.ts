type accountType = {
    value: string;
    label: string;
};

export const accountTypeOptions: Array<accountType> = [
    { value: 'savings', label: 'Ahorros' },
    { value: 'credit', label: 'Credito' },
    { value: 'cash', label: 'Efectivo' },
    { value: 'investment', label: 'Inversion' }
];
