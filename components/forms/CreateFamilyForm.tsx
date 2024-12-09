import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import * as Yup from 'yup';
import { client } from '../../amplify/data/resource';
import { createFamily, linkUserToFamily } from '../../graphql/mutations';
import _ from 'lodash';
import { useFinanzasStore } from '../../store';

const familyInput = Yup.string().required('El nombre de la familia es un campo obligatorio');

interface Props {
    onSuccess: () => void;
}

const CreateFamilyForm = (props: Props) => {
    const [familyName, setFamilyName] = useState('');
    const [familyNameError, setFamilyNameError] = useState('');
    const [loading, setLoading] = useState(false);

    const { id: userId } = useFinanzasStore((state) => state.user);
    const setFamily = useFinanzasStore((state) => state.setFamily);

    const handleFamilyInputChange = async (e) => {
        setFamilyName(e.target.value);
        try {
            await familyInput.validate(e.target.value);
            setFamilyNameError('');
        } catch (error) {
            setFamilyNameError(error.message);
        }
    };

    const handleCreateNewFamily = async () => {
        try {
            setLoading(true);
            await familyInput.validate(familyName);

            const createFamilyRes = await client.graphql({
                query: createFamily,
                variables: {
                    input: {
                        name: familyName
                    }
                }
            });

            const familyId = _.get(createFamilyRes, 'data.createFamily.id', '');

            const linkFamilyRes = await client.graphql({
                query: linkUserToFamily,
                variables: {
                    input: {
                        familyId,
                        userId
                    }
                }
            });
            setFamily(_.get(linkFamilyRes, 'data.linkUserToFamily.family', {}));
            props.onSuccess();
        } catch (error) {
            setFamilyNameError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-fluid">
            <h5>Cree un nuevo grupo familiar</h5>
            <div className="field">
                <label htmlFor="familyName">Nombre del nuevo grupo familiar</label>
                <InputText id="familyName" type="text" className={familyNameError ? 'p-invalid' : ''} value={familyName} onChange={handleFamilyInputChange} />
                <span className="text-red-500">{familyNameError}</span>
            </div>
            <Button label="Crear" onClick={handleCreateNewFamily} loading={loading}></Button>
        </div>
    );
};

export default CreateFamilyForm;
