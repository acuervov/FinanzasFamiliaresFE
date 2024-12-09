import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import CreateFamily from '../forms/CreateFamilyForm';
import LinkUserToFamily from '../forms/LinkUserToFamily';

interface Props {
    visible: boolean;
    onHide: () => void;
}

const AssignUserFamily = ({ visible, onHide }: Props) => {
    const [view, setView] = useState('main');

    return (
        <Dialog visible={visible} style={{ width: '30vw' }} modal onHide={onHide} header="Necesita crear o unirse a una familia antes de continuar" closable={false}>
            <div className="flex flex-column">
                <p>Para poder funcionar adecuadamente requerimos que ustede cree o se una a un grupo familiar</p>
                {view !== 'main' ? (
                    <span className="text-blue-400 cursor-pointer mb-2" onClick={() => setView('main')}>
                        <i className="pi pi-arrow-left mr-1"></i>
                        Volver
                    </span>
                ) : (
                    <></>
                )}
                {view === 'main' ? (
                    <div className="flex gap-2 justify-content-center">
                        <Button label="Crear Nueva Familia" severity="success" onClick={() => setView('new')} />
                        <Button label="Unirse A Familia" severity="info" onClick={() => setView('link')} />
                    </div>
                ) : view === 'new' ? (
                    <CreateFamily onSuccess={onHide} />
                ) : view === 'link' ? (
                    <LinkUserToFamily onSuccess={onHide} />
                ) : (
                    <></>
                )}
            </div>
        </Dialog>
    );
};

export default AssignUserFamily;
