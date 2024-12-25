import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import * as Yup from 'yup';
import { client } from '../../amplify/data/resource';
import { createCategory } from '../../graphql/mutations';
import _ from 'lodash';
import { useFinanzasStore } from '../../store';
import { Dropdown } from 'primereact/dropdown';
import { movementTypeOptions } from '../../data/movementTypeOptions';

import { Chips } from 'primereact/chips';

const categorySchema = Yup.object().shape({
    name: Yup.string().required('El nombre de categoria es un campo obligatorio'),
    type: Yup.string().required('El tipo de categoria es un campo obligatorio'),
    subCategories: Yup.array(Yup.string())
});

interface Props {
    onSuccess: () => void;
}

const initialCategory = { name: '', type: '', subCategories: [] };
const initialErrors = { name: '', type: '', subCategories: '' };

const CreateCategoryForm = (props: Props) => {
    const { id: familyId } = useFinanzasStore((state) => state.family);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(initialCategory);

    const [errors, setErrors] = useState(initialErrors);

    const updateField = (value, field) => {
        setErrors(initialErrors);
        setCategory({ ...category, [field]: value });
    };

    const handleCreateNew = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await categorySchema.validate(category, { abortEarly: false });
            const categoryData = { ...category, familyId, isDefault: false };
            const res = await client.graphql({
                query: createCategory,
                variables: {
                    input: {
                        ...categoryData
                    }
                }
            });

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
                <label htmlFor="name">Nombre de la categoria</label>
                <InputText id="name" type="text" value={category.name} onChange={(e) => updateField(e.target.value, 'name')} className={errors.name ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.name}</span>
            </div>
            <div className="field">
                <label htmlFor="type">Tipo de categoria</label>
                <Dropdown id="type" type="text" value={category.type} onChange={(e) => updateField(e.value, 'type')} className={errors.type ? 'p-invalid' : ''} options={movementTypeOptions} />
                <span className="text-red-500">{errors.type}</span>
            </div>
            <div className="field">
                <label htmlFor="subCategories">Lista de subcategorias</label>
                <Chips id="subCategories" type="text" value={category.subCategories} onChange={(e) => updateField(e.value, 'subCategories')} className={errors.subCategories ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.subCategories}</span>
            </div>

            <Button label="Crear" onClick={handleCreateNew} loading={loading}></Button>
        </form>
    );
};

export default CreateCategoryForm;
