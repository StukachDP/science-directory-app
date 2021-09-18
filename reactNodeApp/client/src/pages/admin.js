import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';
import CreateMagazine from '../components/modals/createMagazine';
import { AdminPageContainer, AdminPageButton } from '../styles/adminPage-style';


const Admin = observer(() => {
    const [magazineVisible, setMagazineVisible] = useState(false);

    return (
        <AdminPageContainer>
            <AdminPageButton
                variant={"outline-dark"}
                onClick={() => setMagazineVisible(true)}
            >
                Добавить журнал в базу данных
            </AdminPageButton>
            <CreateMagazine show={magazineVisible} onHide={() => setMagazineVisible(false)}/>

        </AdminPageContainer>
    );
});

export default Admin;