import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { client } from '../../amplify/data/resource';
import { createMovement } from '../../graphql/mutations';
import _ from 'lodash';
import { useFinanzasStore } from '../../store';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { movementTypeOptions } from '../../data/movementTypeOptions';
import useCategories from '../../hooks/useCategories';
import { InputTextarea } from 'primereact/inputtextarea';
import useAccounts from '../../hooks/useAccounts';
import useMovements from '../../hooks/useMovements';

const movementSchema = Yup.object().shape({
    description: Yup.string().required('La descripción es un campo obligatorio'),
    amount: Yup.number().required('El monto es un campo obligatorio'),
    date: Yup.date().required('La fecha es un campo obligatorio'),
    type: Yup.string().required('El tipo es un campo obligatorio'),
    categoryId: Yup.string().required('La categoria es un campo obligatorio'),
    subCategory: Yup.string(),
    sourceId: Yup.string().required('La fuente es un campo obligatorio'),
    endingId: Yup.string(),
    bill: Yup.string(),
    note: Yup.string()
});

interface Props {
    onSuccess: () => void;
}

const initialMovement = { description: '', amount: null, date: '', type: '', categoryId: '', subCategory: '', sourceId: '', endingId: '', bill: '', note: '' };
const initialErrors = { description: '', amount: '', date: '', type: '', categoryId: '', subCategory: '', sourceId: '', endingId: '', bill: '', note: '' };

const CreateMovementForm = (props: Props) => {
    const inputRef = useRef(null);

    const { id: familyId } = useFinanzasStore((state) => state.family);
    const { updateMovementsInfo } = useMovements();
    const { categoryByType, getSubCategoriesByCategory } = useCategories();
    const { groupedAccountsOptions, setAccountsInfo } = useAccounts();
    const [loading, setLoading] = useState(false);
    const [movement, setMovement] = useState(initialMovement);

    const [errors, setErrors] = useState(initialErrors);

    const updateField = useCallback(
        (value, field) => {
            setErrors(initialErrors);
            setMovement({ ...movement, [field]: value });
        },
        [setErrors, setMovement, movement]
    );

    const handleCreateNew = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await movementSchema.validate(movement, { abortEarly: false });
            const movementData = { ...movement, familyId };
            await client.graphql({
                query: createMovement,
                variables: {
                    input: {
                        ...movementData
                    }
                }
            });

            await setAccountsInfo();
            await updateMovementsInfo();
            setMovement(initialMovement);
            inputRef.current.focus();

            props.onSuccess();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = err.inner.reduce((acc, currentError) => {
                    acc[currentError.path] = currentError.message;
                    return acc;
                }, {});

                setErrors({ ...initialErrors, ...errorMessages });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="p-fluid">
            <div className="field">
                <label htmlFor="description">Descripción del movimiento</label>
                <InputText autoFocus ref={inputRef} id="description" type="text" value={movement.description} onChange={(e) => updateField(e.target.value, 'description')} className={errors.description ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.description}</span>
            </div>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="amount">Monto</label>
                    <InputNumber id="amount" inputId="currency-us" value={movement.amount} onChange={(e) => updateField(e.value, 'amount')} className={errors.amount ? 'p-invalid' : ''} mode="currency" currency="USD" />
                    <span className="text-red-500">{errors.amount}</span>
                </div>
                <div className="field col">
                    <label htmlFor="date">Fecha</label>
                    <Calendar id="date" key="date" value={movement.date} onChange={(e) => updateField(e.value, 'date')} showTime hourFormat="24" className={errors.date ? 'p-invalid' : ''} />
                    <span className="text-red-500">{errors.date}</span>
                </div>
            </div>
            <div className="field">
                <label htmlFor="type">Tipo de movimiento</label>
                <Dropdown id="type" type="text" value={movement.type} onChange={(e) => updateField(e.value, 'type')} className={errors.type ? 'p-invalid' : ''} options={movementTypeOptions} />
                <span className="text-red-500">{errors.type}</span>
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="categoryId">Categoria</label>
                    <Dropdown
                        id="categoryId"
                        type="text"
                        value={movement.categoryId}
                        onChange={(e) => updateField(e.value, 'categoryId')}
                        className={errors.categoryId ? 'p-invalid' : ''}
                        options={categoryByType(movement.type)}
                        optionLabel="name"
                        optionValue="id"
                    />
                    <span className="text-red-500">{errors.categoryId}</span>
                </div>
                <div className="field col">
                    <label htmlFor="subCategory">Subcategoria</label>
                    <Dropdown
                        id="subCategory"
                        type="text"
                        value={movement.subCategory}
                        onChange={(e) => updateField(e.value, 'subCategory')}
                        className={errors.subCategory ? 'p-invalid' : ''}
                        options={getSubCategoriesByCategory(movement.categoryId)}
                    />
                    <span className="text-red-500">{errors.subCategory}</span>
                </div>
            </div>

            <div className="field">
                <label htmlFor="sourceId">{<span>{movement.type === 'income' ? 'Destino' : 'Fuente'}</span>} del movimiento</label>
                <Dropdown value={movement.sourceId} onChange={(e) => updateField(e.value, 'sourceId')} options={groupedAccountsOptions} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" />
                <span className="text-red-500">{errors.sourceId}</span>
            </div>
            {movement.type === 'transfer' && (
                <div className="field">
                    <label htmlFor="sourceId">Destino del movimiento</label>
                    <Dropdown value={movement.endingId} onChange={(e) => updateField(e.value, 'endingId')} options={groupedAccountsOptions} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" />
                    <span className="text-red-500">{errors.endingId}</span>
                </div>
            )}
            <div className="field">
                <label htmlFor="bill">Link de factura</label>
                <InputText id="bill" type="text" value={movement.bill} onChange={(e) => updateField(e.target.value, 'bill')} className={errors.bill ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.bill}</span>
            </div>
            <div className="field">
                <label htmlFor="note">Nota</label>
                <InputTextarea id="note" value={movement.note} onChange={(e) => updateField(e.target.value, 'note')} className={errors.note ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.note}</span>
            </div>
            <Button label="Crear" onClick={handleCreateNew} loading={loading}></Button>
        </form>
    );
};

export default CreateMovementForm;
