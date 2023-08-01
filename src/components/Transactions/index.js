import { Component } from "react";

import SideBar from "../Sidebar";
import Navbar from "../NavBar";
import ListOfTransactions from "../ListOfTransactions"
import {BallTriangle} from 'react-loader-spinner'

import "./index.css"
import "../UserDashboard/index.css"
import Cookies from "js-cookie";
import AllContext from "../../context/AllContext";

const TransactionsTabs = [
    {id : 1 , name : "All Transactions"} ,
    {id :2 , name : "Debit"} ,
    {id : 3 , name : "Credit"}
]

const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

class Transactions extends Component{

    state = {TransactionsList : [] ,statusOfDisplay: positionOfDisplay.loading}

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
        
        this.setState({TransactionsList : data.transactions , statusOfDisplay: positionOfDisplay.success})

    }

    InProccesing = () => (
        <div className="loader"><BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" /></div>
          
        
      )

    render(){
        const {TransactionsList , statusOfDisplay} = this.state
        return(
            <AllContext.Consumer>
                {value =>{
                    const {navBarActtiveId} = value
                    let updatedList ;
                    if(navBarActtiveId.name === "All Transactions"){
                        updatedList = TransactionsList
                    }else{
                        updatedList = TransactionsList.filter((eachValue) => eachValue.type === navBarActtiveId.name.toLowerCase())
                    }
                    
                    return(
                        <div className="bg-container-Dashboard">
                            <SideBar/>
                            <div className="content-display-container">
                                <Navbar title="Transactions" navBarTabs={TransactionsTabs}/>
                                <div className="container-of-ul">
                                    {statusOfDisplay === "SUCCESS" ? (
                                        <ListOfTransactions TransactionsList={updatedList}/>
                                    ) :(
                                        this.InProccesing()
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    )
                }}
            </AllContext.Consumer>
        )
    }
}

export default Transactions