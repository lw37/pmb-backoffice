import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class TablaUsuarios extends React.Component {

  state = {
    usuarios: [],
  }
  render() {
    return (
      <>
        <div>
          <DataTable value={this.state.usuarios}>
            <Column field="UsuarioId" header="Email"></Column>
            <Column field="Nombre" header="Nombre"></Column>
            <Column field="Apellido" header="Apellido"></Column>
            <Column field="Edad" header="Edad"></Column>
            <Column field="FechaAlta" header="Fecha de Alta"></Column>
          </DataTable>
        </div>
        <button onClick={this.getUsuarios}> actualizaar</button>
      </>
    )
  }

  getUsuarios = () => {
    const promise = axios.get("https://localhost:44315/api/usuarios");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      console.log("Usuarios"+this.state.usuarios)
      console.log(this.state.prueba)
      this.setState({ usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })
    });
  }
  componentDidUpdate(){

  }
  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/usuarios");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      this.setState({ usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })

    });
  }

}
