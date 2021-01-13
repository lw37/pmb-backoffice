import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

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
      <label> Email: </label>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={this.filtroEmail} placeholder="Search" />
        </span>
        <label> Nombre: </label>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={this.filtroNombre}  placeholder="Search" />
        </span>
        <label> Apellido: </label>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={this.filtroApellido} placeholder="Search" />
        </span>
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
  
  filtroEmail = (evento) => {
    this.setState({ textoEmail: evento.target.value }, () => {this.filtro()});
  }

  filtroNombre = (evento) => {
    this.setState({ textoNombre: evento.target.value }, () => {this.filtro()});
  }

  filtroApellido = (evento) => {
    this.setState({ textoApellido: evento.target.value }, () => {this.filtro()});
  }

  filtro = () => {
    if (this.state.textoEmail !== "") {
     const lista= this.state.usuarios.filter(a=>a.Email===this.state.textoEmail)
     this.setState({lista});
    }else if (this.state.textoNombre !== "") {
      const lista= this.state.usuarios.filter(a=>a.Nombre===this.state.textoNombre)
      this.setState({lista});
    }
    else if (this.state.textoApellido !== ""){
      const lista= this.state.usuarios.filter(a=>a.Apellido===this.state.textoApellido)
      this.setState({lista});
    }else{
      this.getUsuarios();
    }
   
  }

  eliminar = (rowData) => {
    return <><button onClick={() => { this.delUsuario(rowData.UsuarioId) }}>eliminar</button></>

  }
  
  delUsuario = (id) => {
    axios.delete("https://localhost:44315/api/usuarios/" + id);
  }

  getUsuarios = () => {
    const promise = axios.get("https://localhost:44315/api/usuarios");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      console.log("Usuarios" + this.state.usuarios)
      this.setState({ usuarios,lista:usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })
    });
  }
  componentDidUpdate() {

  }
  componentDidMount() {
    this.getUsuarios();
  }

}
