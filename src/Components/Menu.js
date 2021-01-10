import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

export const Menu = () => {

    const items = [
        {label: 'Usuarios', icon: 'pi pi-user-edit'},
        {label: 'Apuestas', icon: 'pi pi-fw pi-table'},
        {label: 'Eventos', icon: 'pi pi-fw pi-table'},
        {label: 'Informes', icon: 'pi pi-fw pi-eye'}
      
    ];

    return (
        <div>
            <div >
                <TabMenu model={items} />
            </div>
        </div>
    );
}
