import { Component } from 'react';
import {Switch , Route} from "react-router-dom"
import Login from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import Transactions from "./components/Transactions"
import ProfileTab from './components/ProfileTab/inde';
import AllContext from './context/AllContext';
import ProtectedRouter from './ProtectedRouter';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/NotFound';

import './App.css';

class App extends Component {
  state = {sideBarActiveId : 1, navBarActtiveId : {id : 1 , name : "All Transactions"} , deleteId : ""}

  clickSideBarTab = (id) =>{
    this.setState({sideBarActiveId : id})
  }

  clickNavBarTab = (value) =>{
    this.setState({navBarActtiveId : {id : value.id , name : value.name}})
  }

  deleteBtnClick = (id)=>{
    this.setState({deleteId : id})
  }

  render(){
    const {sideBarActiveId , navBarActtiveId , deleteId} = this.state
    return(
      <AllContext.Provider 
        value={{
          sideBarActiveId , 
          navBarActtiveId, 
          clickSideBarTab : this.clickSideBarTab ,
          clickNavBarTab : this.clickNavBarTab  ,
          deleteBtnClick : this.deleteBtnClick}}
      >
        <Switch>
          <Route exact path="/login" component={Login}/>
          <ProtectedRouter exact path="/userdashboard" component={UserDashboard}/>
          <ProtectedRouter exact path="/trasactions" component={Transactions}/>
          <ProtectedRouter exact path="/ProfileTab" component={ProfileTab}/>
          <ProtectedRouter exact path="/admindashboard" component={AdminDashboard}/>
          <NotFound component={NotFound}/>
        </Switch>
      </AllContext.Provider>
    )
  }
}

export default App;
