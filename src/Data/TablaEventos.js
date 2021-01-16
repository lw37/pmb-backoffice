import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import InputLabel   from '../Components/InputLabel';
import Moment from 'moment';
export default class TablaEventos extends React.Component {

  state = {
    eventos: [],
    lista:[],
    textoLocal:"",
    textoVisitante:"",
    textoFecha:"",
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
        {this.state.menuNom === "Lista" ? 
        <div>
          <div>
            <label>Fecha:</label>
          <Calendar  id="icon" showIcon onChange={e=>{ this.setState({ textoFecha: Moment(e.target.value).format('YYYY-MM-DD').toString()},()=>this.filtro())}} />
          </div>
          <InputLabel labe="Equipo Local:" callback={this.filtroLocal}/>
          <InputLabel labe="Equipo Visitante:" callback={this.filtroVisitante}/>

          <DataTable value={this.state.lista}>
          <Column field="EventoId" header="ID"></Column>
            <Column field="NombreEquipo" header="Equipo Local"></Column>
            <Column field="Visitante" header="Equipo Visitante"></Column>
            <Column field="FechaEvento" header="Fecha de Evento"></Column>
            <Column body={this.getFecha} header="Cambiar Fecha"></Column>
            <Column body={this.altaMercado} header="Dar de Alta Mercados"></Column>
          </DataTable>
          <button onClick={this.getEventos}> actualizar</button>
        </div>
          :
          <div>
            <p>Crear nuevo evento</p>
            <div >
              <label>Fecha:</label>
              <Calendar  id="icon" showIcon onChange={e=>this.setState({ fechaEvento: Moment(e.target.value).format('YYYY-MM-DD').toString()},()=>console.log('Crear '+this.state.fechaEvento))} />
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
  
  filtroLocal=(e)=>{
    this.setState({ textoLocal: e.target.value }, () => { this.filtro() });
  }
  
  filtroVisitante=(e)=>{
    this.setState({ textoVisitante: e.target.value }, () => { this.filtro() });
  }

  filtro=()=>{
    if (this.state.textoLocal !== "") {
      const lista = this.state.eventos.filter(a => a.NombreEquipo === this.state.textoLocal)
      
      this.setState({ lista });
    } else if (this.state.textoVisitante !== "") {
      const lista = this.state.eventos.filter(a => a.Visitante === this.state.textoVisitante)
      this.setState({ lista });
    }
    else if (this.state.textoFecha !== "") {
      const lista = this.state.eventos.filter(a => a.FechaEvento === this.state.textoFecha)
      console.log("filtro "+this.state.textoFecha);
      this.setState({ lista });
    } else {
      this.getEventos();
    }
  }
  
  getFecha=(rowData)=>{
    return(
    <div>
     <button onClick={() => { this.delEvento(rowData.EventoId) }} >Eliminar Evento</button>
    <Calendar  id="icon" showIcon onChange={e=>{this.updateEvento(rowData,e.target.value)}} />
    </div>)
  }

  delEvento=(id)=>{
    axios.delete("https://localhost:44315/api/eventos/" + id).then(res=>{
      this.getEventos();
    })
  }

  altaMercado=(rowData)=>{
    return  <> <button onClick={()=>{this.addMercado(rowData.EventoId)}}>Alta Mercado</button> </>
  }

  addMercado=(id)=>{
    const MercadoId=undefined;
    const TipoMercado1=1.5;
    const TipoMercado2=2.5;
    const TipoMercado3=3.5;
    const CuotaOver=1.9;
    const CuotaUnder=1.9;
    const DineroOver=100;
    const DineroUnder=100;
    const Bloqueado=true;
    const EventoId=id;

    axios.get("https://localhost:44315/api/mercados").then(res=>{
      const mercadosRe= res.data.filter(m=>m.EventoId===id);
      console.log(mercadosRe);
      if (mercadosRe.length===0){
        const mercado1={MercadoId,TipoMercado1,CuotaOver,CuotaUnder,DineroOver,DineroUnder,Bloqueado,EventoId};
        const mercado2={MercadoId,TipoMercado2,CuotaOver,CuotaUnder,DineroOver,DineroUnder,Bloqueado,EventoId};
        const mercado3={MercadoId,TipoMercado3,CuotaOver,CuotaUnder,DineroOver,DineroUnder,Bloqueado,EventoId};
        const mercados=[mercado1,mercado2,mercado3];
        for (let i = 0; i < mercados.length; i++) {
         axios.post("https://localhost:44315/api/mercados",mercados[i]).then(console.log(mercados[i]))
        }
      }else{
        console.log("Ya existe mercados de este evento.")
      }

    })
  }

  updateEvento=(evento,fecha)=>{
    const FechaEvento= Moment(fecha).format('YYYY-MM-DD').toString();

    axios.put("https://localhost:44315/api/eventos/"+evento.EventoId+"?fecha="+FechaEvento).then(()=>{this.getEventos()
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
