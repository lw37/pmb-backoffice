import './App.css';
import React, { Fragment } from 'react';
import { TabMenu } from 'primereact/tabmenu';
class App extends React.Component {
  state={
    showUsuarios:true,
    showApuestas:false,
    showEventos:false,
    showInformes:false,
    items : [
      {label: 'Usuarios', icon: 'pi pi-user-edit'},
      {label: 'Apuestas', icon: 'pi pi-fw pi-table'},
      {label: 'Eventos', icon: 'pi pi-fw pi-table'},
      {label: 'Informes', icon: 'pi pi-fw pi-eye'}
  ]
  };

  render() {
      
    return (
      <>
        <TabMenu model={this.state.items}  />
        <Fragment>
     
        <Fragment>

        </Fragment>

        </Fragment>
        <Fragment>

        </Fragment>
        <Fragment>

        </Fragment>
      </>
    );
  }
}

export default App;
