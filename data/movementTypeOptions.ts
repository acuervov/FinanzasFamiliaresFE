type movementType = {
    value: string;
    label: string;
    color: string;
};

export const movementTypeOptions: Array<movementType> = [
    { value: 'purchase', label: 'Compra', color: 'red-600' },
    { value: 'income', label: 'Ingreso', color: 'green-600' },
    // { value: 'transfer', label: 'Transferencia interna', color: 'indigo-600' }
];
