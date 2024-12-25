import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import * as Yup from 'yup';
import { client } from '../../amplify/data/resource';
import { createAccount } from '../../graphql/mutations';
import _ from 'lodash';
import { useFinanzasStore } from '../../store';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { accountTypeOptions } from '../../data/accountTypeOptions';

const accountSchema = Yup.object().shape({
    name: Yup.string().required('El nombre de la cuenta es obligatorio'),
    description: Yup.string(),
    overAllTotal: Yup.number(),
    type: Yup.string().required('El tipo de cuenta es obligatorio')
});

interface Props {
    onSuccess: () => void;
}

const initialErrors = { name: '', description: '', overAllTotal: '', type: '' };

const CreateAccountForm = (props: Props) => {
    const { id: userId } = useFinanzasStore((state) => state.user);
    const { setUser, setFamily } = useFinanzasStore((state) => state);

    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({
        name: '',
        description: '',
        overAllTotal: 0,
        type: ''
    });

    const [errors, setErrors] = useState(initialErrors);

    const updateField = (value, field) => {
        setErrors(initialErrors);
        setAccount({ ...account, [field]: value });
    };

    const handleCreateNewAccount = async () => {
        setLoading(true);

        try {
            await accountSchema.validate(account, { abortEarly: false });
            const accountData = { ...account, userId };
            const res = await client.graphql({
                query: createAccount,
                variables: {
                    input: {
                        ...accountData
                    }
                }
            });
            const user = _.get(res, 'data.createAccount.owner');
            setUser(user);
            setFamily(user.family);

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
        <div className="p-fluid">
            <div className="field">
                <label htmlFor="name">Nombre de la cuenta</label>
                <InputText id="name" type="text" value={account.name} onChange={(e) => updateField(e.target.value, 'name')} className={errors.name ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.name}</span>
            </div>
            <div className="field">
                <label htmlFor="description">Descripción</label>
                <InputText id="description" type="text" value={account.description} onChange={(e) => updateField(e.target.value, 'description')} className={errors.description ? 'p-invalid' : ''} />
                <span className="text-red-500">{errors.description}</span>
            </div>
            <div className="field">
                <label htmlFor="overAllTotal">Saldo actual de la cuenta</label>
                <InputNumber id="overAllTotal" inputId="currency-us" value={account.overAllTotal} onChange={(e) => updateField(e.value, 'overAllTotal')} className={errors.overAllTotal ? 'p-invalid' : ''} mode="currency" currency="USD" />
                <span className="text-red-500">{errors.overAllTotal}</span>
            </div>
            <div className="field">
                <label htmlFor="type">Tipo de cuenta</label>
                <Dropdown id="type" type="text" value={account.type} onChange={(e) => updateField(e.value, 'type')} className={errors.type ? 'p-invalid' : ''} options={accountTypeOptions} />
                <span className="text-red-500">{errors.type}</span>
            </div>
            <Button label="Crear" onClick={handleCreateNewAccount} loading={loading}></Button>
        </div>
    );
};

export default CreateAccountForm;
