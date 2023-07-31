import { Component } from 'react';
import {Switch , Route} from "react-router-dom"
import Login from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import Trasactions from "./components/Trasactions"
import ProfileTab from './components/ProfileTab/inde';
import AllContext from './context/AllContext';
import ProtectedRouter from './ProtectedRouter';

import './App.css';

class App extends Component {
  state = {sideBarActiveId : 1, navBarActtiveId : 1}

  clickSideBarTab = (id) =>{
    this.setState({sideBarActiveId : id})
  }

  clickNavBarTab = (id) =>{
    this.setState({navBarActtiveId : id})
  }

  render(){
    const {sideBarActiveId , navBarActtiveId} = this.state
    return(
      <AllContext.Provider 
        value={{
          sideBarActiveId , 
          navBarActtiveId, 
          clickSideBarTab : this.clickSideBarTab ,
          clickNavBarTab : this.clickNavBarTab }}
      >
        <Switch>
          <Route exact path="/login" component={Login}/>
          <ProtectedRouter exact path="/userdashboard" component={UserDashboard}/>
          <ProtectedRouter exact path="/trasactions" component={Trasactions}/>
          <ProtectedRouter exact path="/ProfileTab" component={ProfileTab}/>
        </Switch>
      </AllContext.Provider>
    )
  }
}

export default App;
