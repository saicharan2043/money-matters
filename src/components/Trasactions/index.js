import { Component } from "react";

import SideBar from "../Sidebar";
import Navbar from "../NavBar";
import ListOfTrasactions from "../ListOfTrasactions"
import {BallTriangle} from 'react-loader-spinner'

import "./index.css"
import "../UserDashboard/index.css"
import Cookies from "js-cookie";

const TrasactionsTabs = [
    {id : 1 , name : "All Trasactions"} ,
    {id :2 , name : "Debit"} ,
    {id : 3 , name : "Credit"}
]

const positionOfDisplay = {
    success: 'SUCCESS',
    failure: 'FAILURE',
    loading: 'LOADING',
  }

class Trasactions extends Component{

    state = {TrasactionsList : [] ,statusOfDisplay: positionOfDisplay.loading}

    componentDidMount(){
        this.getData()
    }


    getData = async() =>{
        this.setState({statusOfDisplay: positionOfDisplay.loading})
        const id = Cookies.get("user_id")
        const url = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${100}&offset=${0}`
        const options= {
            method : "GET" ,
            headers : {
                "Content-Type" : "application/json" ,
                "x-hasura-admin-secret" :"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF" ,
                "x-hasura-role" : "user" ,
                "x-hasura-user-id" : id
            } 
        }
        const response = await fetch(url , options)
        const data = await response.json()
        
        this.setState({TrasactionsList : data.transactions , statusOfDisplay: positionOfDisplay.success})

    }

    InProccesing = () => (
        <div className="loader"><BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" /></div>
          
        
      )

    render(){
        const {TrasactionsList , statusOfDisplay} = this.state
        return(
            <div className="bg-container-Dashboard">
                <SideBar/>
                <div className="content-display-container">
                    <Navbar title="Trasactions" navBarTabs={TrasactionsTabs}/>
                    <div className="container-of-ul">
                        {statusOfDisplay === "SUCCESS" ? (
                            <ListOfTrasactions TrasactionsList={TrasactionsList}/>
                        ) :(
                            this.InProccesing()
                        )}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Trasactions