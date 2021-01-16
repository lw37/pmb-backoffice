import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import InputLabel   from '../Components/InputLabel';

export default class TablaUsuarios extends React.Component {
  state = {
    textoApellido: "",
    usuarios: [],
    lista: [],
    textoEmail: "",
    textoNombre: "",
  }

  render() {
    return (
      <>
       <InputLabel labe="Email:" callback={this.filtroEmail}/>
       <InputLabel labe="Nombre:" callback={this.filtroNombre}/>
       <InputLabel labe="Apellido:" callback={this.filtroApellido}/>
        <div>
          <DataTable value={this.state.lista}>
            <Column field="Email" header="Email"></Column>
            <Column field="Nombre" header="Nombre"></Column>
            <Column field="Apellido" header="Apellido"></Column>
            <Column field="Edad" header="Edad"></Column>
            <Column field="FechaAlta" header="Fecha de Alta"></Column>
            <Column body={this.eliminar} ></Column>
          </DataTable>
        </div>
        <button onClick={this.getUsuarios}> actualizar</button>
      </>
    )
  }

  filtroEmail = (e) => {
    this.setState({ textoEmail: e.target.value }, () => { this.filtro() });
  }

  filtroNombre = (e) => {
    this.setState({ textoNombre: e.target.value }, () => { this.filtro() });
  }

  filtroApellido = (e) => {
    this.setState({ textoApellido: e.target.value }, () => { this.filtro() });
  }

  filtro = () => {
    if (this.state.textoEmail !== "") {
      const lista = this.state.usuarios.filter(a => a.Email === this.state.textoEmail)
      this.setState({ lista });
    } else if (this.state.textoNombre !== "") {
      const lista = this.state.usuarios.filter(a => a.Nombre === this.state.textoNombre)
      this.setState({ lista });
    }
    else if (this.state.textoApellido !== "") {
      const lista = this.state.usuarios.filter(a => a.Apellido === this.state.textoApellido)
      this.setState({ lista });
    } else {
      this.getUsuarios();
    }
  }

  eliminar = (rowData) => {
    return <><button onClick={() => { this.delUsuario(rowData.UsuarioId) }}>eliminar</button></>
  }

  delUsuario = (id) => {
    axios.delete("https://localhost:44315/api/usuarios/" + id).then(res=>{
      this.getUsuarios();
    })
  }

  getUsuarios = () => {
    const promise = axios.get("https://localhost:44315/api/usuarios");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      console.log("Usuarios" + this.state.usuarios)
      this.setState({ usuarios, lista: usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })
    });
  }

  componentDidMount() {
    this.getUsuarios();
  }

}
