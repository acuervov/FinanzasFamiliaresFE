import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import * as Yup from 'yup';
import { linkUserToFamily } from '../../graphql/mutations';
import { client } from '../../amplify/data/resource';
import { useFinanzasStore } from '../../store';
import _ from 'lodash';

const familyInput = Yup.string().required('El Id de la familia es un campo obligatorio');

interface Props {
    onSuccess: () => void;
}

const LinkUserToFamily = (props: Props) => {
    const [familyId, setFamilyId] = useState('');
    const [familyIdError, setFamilyIdError] = useState('');
    const [loading, setLoading] = useState(false);

    const { id: userId } = useFinanzasStore((state) => state.user);
    const setFamily = useFinanzasStore((state) => state.setFamily);

    const handleFamilyInputChange = async (e) => {
        setFamilyId(e.target.value);
        try {
            await familyInput.validate(e.target.value);
            setFamilyIdError('');
        } catch (error) {
            setFamilyIdError(error.message);
        }
    };

    const handleLinkToFamily = async () => {
        try {
            setLoading(true);
            await familyInput.validate(familyId);

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
            setFamilyIdError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-fluid">
            <h5>Unete a un grupo familiar existente</h5>
            <div className="field">
                <label htmlFor="familyName">Id del grupo Familiar</label>
                <InputText id="familyName" type="text" className={familyIdError ? 'p-invalid' : ''} value={familyId} onChange={handleFamilyInputChange} />
                <span className="text-red-500">{familyIdError}</span>
            </div>
            <Button label="Crear" onClick={handleLinkToFamily} loading={loading}></Button>
        </div>
    );
};

export default LinkUserToFamily;
