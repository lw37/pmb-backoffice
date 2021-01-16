import React from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
export default class TablaInformes extends React.Component {
    state = {
        usuarios: [],
        apuestas: []
    }
    render() {
        const usuarios = {
            labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viserves', 'Sabados', 'Domingos'],
            datasets: [
                {
                    label: 'Usuarios',
                    data: this.state.usuarios,
                    fill: false,
                    borderColor: '#42A5F5'
                }
            ]
        };
        const apuestas = {
            labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viserves', 'Sabados', 'Domingos'],
            datasets: [
                {
                    label: 'Apuestas',
                    data: this.state.apuestas,
                    fill: false,
                    borderColor: '#42A5F5'
                }
            ]
        };
        return (
            <>
                <div className="card">
                    <h5>Usuarios</h5>
                    <Chart type="bar" data={usuarios} />
                </div>
                <div className="card">
                    <h5>Apuestas</h5>
                    <Chart type="line" data={apuestas} />
                </div>
            </>
        );
    }

    getApuestas = () => {
        const promise = axios.get("https://localhost:44315/api/Apuestas");
        const promiseResult = promise.then(res => {
            const apuestas = this.dividirApuestas(res.data);
            this.setState({ apuestas }, () => { console.log("Estos son apuestas"); console.log(apuestas); })
        });
    }

    dividirApuestas = (apuestas) => {
        const n1 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 0 );
        const n2 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 1 );
        const n3 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 2 );
        const n4 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 3 );
        const n5 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 4 );
        const n6 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 5 );
        const n7 = apuestas.filter(apuesta =>  new Date(apuesta.fechaApuesta).getDay() === 6 );
        const apu = [n1.length, n2.length, n3.length, n4.length, n5.length, n6.length, n7.length];
        console.log(apu)
        return apu;
    }
    getUsuarios = () => {
        axios.get("https://localhost:44315/api/usuarios").then(res => {
            const usuarios = this.dividirUsuarios(res.data);
            this.setState({ usuarios }, () => { console.log(new Date(this.state.usuarios[3].FechaAlta).getDay()); })
        });
    }

    dividirUsuarios = (usuarios) => {
        const n1 = usuarios.filter(usuario =>  new Date(usuario.FechaAlta).getDay() === 0);
        const n2 = usuarios.filter(usuario => new Date(usuario.FechaAlta).getDay() === 1 );
        const n3 = usuarios.filter(usuario =>  new Date(usuario.FechaAlta).getDay() === 2 );
        const n4 = usuarios.filter(usuario => new Date(usuario.FechaAlta).getDay() === 3 );
        const n5 = usuarios.filter(usuario =>  new Date(usuario.FechaAlta).getDay() === 4 );
        const n6 = usuarios.filter(usuario =>  new Date(usuario.FechaAlta).getDay() === 5);
        const n7 = usuarios.filter(usuario => new Date(usuario.FechaAlta).getDay() === 6 );
        const personas = [n1.length, n2.length, n3.length, n4.length, n5.length, n6.length, n7.length];
        return personas;
    }

    componentDidMount = () => {
        this.getUsuarios();
        this.getApuestas();
    }
}