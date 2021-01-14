import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import Moment from 'moment';
export default class TablaEventos extends React.Component {

  state = {
    eventos: [],
    lista:[],
    nombreEquipo: "",
    visitante: "",
    fechaEvento: "",
    menu: ["Lista", "+ Nuevo Evento"],
    menuNom: "Lista"
  }
  render() {
    return (
      <>
        <SelectButton options={this.state.menu} onChange={(e) => this.setState({ menuNom: e.value })} />
        {this.state.menuNom === "Lista" ? <div>
          <DataTable value={this.state.lista}>
          <Column field="EventoId" header="ID"></Column>
            <Column field="NombreEquipo" header="Equipo Local"></Column>
            <Column field="Visitante" header="Equipo Visitante"></Column>
            <Column field="FechaEvento" header="Fecha de Evento"></Column>
            <Column body={this.getFecha} header="Cambiar Fecha"></Column>
          </DataTable>
          <button onClick={this.getEventos}> actualizar</button>
        </div>
          :



          <div>
            <p>Crear nuevo evento</p>
            <div >
              <label>Fecha:</label>
              <Calendar  id="icon" showIcon onChange={e=>this.setState({ fechaEvento: Moment(e.target.value).format('YYYY-MM-DD').toString()},()=>console.log(this.state.fechaEvento))} />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText  placeholder="Equipo Local" onChange={e=>this.setState({ nombreEquipo: e.target.value },()=>console.log(this.state.nombreEquipo))} />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText  placeholder="Equipo Visitante" onChange={e=>this.setState({ visitante: e.target.value },()=>console.log(this.state.visitante))}  ></InputText></div>
            <button onClick={this.addEvento}> Añadir</button>
          </div>
        }

      </>
    )
  }
  
  getFecha=(rowData)=>{
    return(
    <div>
     <button>Eliminar Evento</button>
    <Calendar  id="icon" showIcon onChange={e=>{this.updateEvento(rowData,e.target.value)}} />
    </div>)
  }

  updateEvento=(evento,fecha)=>{
    const FechaEvento= Moment(fecha).format('YYYY-MM-DD').toString();
    const EventoId=evento.EventoId;
    const NombreEquipo=evento.NombreEquipo;
    const Visitante=evento.Visitante;
    const evento1={EventoId,FechaEvento,NombreEquipo,Visitante}
    console.log(evento1);
    axios.put("https://localhost:44315/api/eventos/"+evento1.EventoId,evento1).then(()=>{this.getEventos()
 
  })
  }

  addEvento = () => {

    let FechaEvento=this.state.fechaEvento;
    let NombreEquipo=this.state.nombreEquipo;
    let Visitante=this.state.visitante;
    let EventoId;
   
    if( FechaEvento!==null && NombreEquipo!=="" && Visitante!==""){
      
      let evento={EventoId,FechaEvento,NombreEquipo,Visitante}
      axios.post("https://localhost:44315/api/eventos",evento ).then(console.log(evento))
    }else{
      console.log("Por favor introduce todo los campos.");
    }
  }

  getEventos = () => {
    const promise = axios.get("https://localhost:44315/api/eventos");
    const promiseResult = promise.then(res => {
      const eventos = res.data.map(e=>{
        e.FechaEvento=Moment(e.FechaEvento).format('YYYY-MM-DD');
        return e;
      })
      console.log( this.state.eventos)
      this.setState({ eventos,lista:eventos}
      , () => { console.log("Estos son eventos"); console.log(this.state.eventos);
     })
    });
  }


  componentDidUpdate() {

  }
  componentDidMount() {
    this.getEventos();
  }

}
