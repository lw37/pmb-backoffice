import './App.css';
import React, { Fragment } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import TablaUsuarios from './Data/TablaUsuarios'
import TablaApuestas from "./Data/TablaApuestas";
import TablaEventos from './Data/TablaEventos';
import TablaMercados from "./Data/TablaMercados";
import TablaInformes from "./Data/TablaInformes";
import Menu from './Components/Menu';

class App extends React.Component {

  state = {
    MenuNom: "Usuarios",
    menu: [
      { label: 'Usuarios', icon: 'pi pi-user-edit' },
      { label: 'Apuestas', icon: 'pi pi-fw pi-table' },
      { label: 'Mercados', icon: 'pi pi-fw pi-table' },
      { label: 'Eventos', icon: 'pi pi-fw pi-table' },
      { label: 'Informes', icon: 'pi pi-fw pi-eye' }
    ]
  };

  render() {

    return (
      <>
      <Menu></Menu>
      </>
    );
  }
}
/*
<TabMenu model={this.state.menu} onTabChange={(e) => this.setState({ MenuNom: e.value.label }, () => { console.log(this.state.MenuNom) })} />
{this.state.MenuNom === 'Usuarios' && <TablaUsuarios></TablaUsuarios>}
{this.state.MenuNom === 'Apuestas' &&<TablaApuestas></TablaApuestas>}
{this.state.MenuNom === 'Mercados' && <TablaMercados></TablaMercados>}
{this.state.MenuNom === 'Eventos' && <TablaEventos></TablaEventos>}
{this.state.MenuNom === 'Informes' && <TablaInformes></TablaInformes>}*/
export default App;
