import './App.css';
import React, { Fragment } from 'react';
import { TabMenu } from 'primereact/tabmenu';
class App extends React.Component {
  state={
    MenuNom:"Usuarios",
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
        <TabMenu model={this.state.items} onTabChange={(e) => this.setState({MenuNom: e.value.label},()=>{console.log(this.state.MenuNom)})}/>
        {this.state.MenuNom==='Usuarios' && this.renderTablaUsuarios()}
        {this.state.MenuNom==='Apuestas'?<Fragment>
          <p>Aqui es tabla de Apuestas</p>
        </Fragment>:null}
        {this.state.MenuNom==='Eventos'?<Fragment>
          <p>Aqui es tabla de Eventos</p>
        </Fragment>:null}
        {this.state.MenuNom==='Informes'?<Fragment>
          <p>Aqui es tabla de Informes</p>
        </Fragment>:null}
      </>
    );
  }
  renderTablaUsuarios=()=>(
<Fragment>
          <p>Aqui es tabla de usarios</p>
        </Fragment>
  );

}

export default App;
