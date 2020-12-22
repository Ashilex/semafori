import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MainTemplate from '../../components/MainTemplate/MainTemplate'
import Home from "../Home/Home";
import Pokedex from "../Pokedex/Pokedex";
import Info from "../Info/Info";
import PokemonDetail from "../PokemonDetail/PokemonDetail";
import Logo from "../../assets/images/Italian_traffic_signs_-_semaforo_orizzontale.svg"
import AddSemaforo from "../Add_semaforo/AddSemaforo";
import Play from "../Play/Play";

function App() {

  const nav = [
      {url: "/", text: "Home", exact: true},
      {url: "/pokedex", text: "Pokédex", exact: false},
      {url: "/info", text: "Info", exact: true},
  ]

  return (
      <BrowserRouter>
          <MainTemplate
            footerCourseName="TASD"
            footerCourseLink="https://elearning.unimib.it/course/view.php?id=31277"
            navItems={nav}
            logo={Logo} >
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/pokedex" component={Pokedex}/>
                  <Route exact path="/info" component={Info}/>
                  <Route exact path="/pokedex/:number" component={PokemonDetail}/>
                  <Route exact path="/add_semaforo" component={AddSemaforo}/>
                  <Route exact path="/play/:id" component={Play}/>
              </Switch>
          </MainTemplate>
      </BrowserRouter>
  );
}

export default App;
