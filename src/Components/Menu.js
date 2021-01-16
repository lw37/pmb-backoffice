import React from 'react';
import { Button } from 'primereact/button';
import { Switch, Route, Link } from 'react-router-dom';

import TablaUsuarios from '../Data/TablaUsuarios'
import TablaApuestas from "../Data/TablaApuestas";
import TablaEventos from '../Data/TablaEventos';
import TablaMercados from "../Data/TablaMercados";
import TablaInformes from "../Data/TablaInformes";

export default class Menu extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <ul>
                        <li>
                            <Link to={'/usuarios'}><Button label="Usuarios" className="p-button-raised p-button-rounded" /></Link>
                        </li>
                        <li>
                            <Link to={'/apuestas'}><Button label="Apuestas" className="p-button-raised p-button-rounded" /></Link>
                        </li>
                        <li>
                            <Link to={'/mercados'}><Button label="Mercados" className="p-button-raised p-button-rounded" /></Link>

                        </li>
                        <li><Link to={'/eventos'}><Button label="Eventos" className="p-button-raised p-button-rounded" />  </Link>
                        </li>
                        <li>
                            <Link to={'/informes'}><Button label="Informes" className="p-button-raised p-button-rounded" /></Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route path="/apuestas">
                            <TablaApuestas />
                        </Route>
                        <Route path="/usuarios">
                            <TablaUsuarios />
                        </Route>
                        <Route path="/mercados">
                            <TablaMercados />
                        </Route>
                        <Route path="/eventos">
                            <TablaEventos />
                        </Route>
                        <Route path="/informes">
                            <TablaInformes />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

