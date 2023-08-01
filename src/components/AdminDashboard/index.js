import { Component } from "react";

import SideBar from "../Sidebar";
import Navbar from "../NavBar";
import ListOfTrasactions from "../ListOfTransactions"
import {BallTriangle} from 'react-loader-spinner'

import "./index.css"
import SumOfDebitAndCredit from "../SumOfDebitAndCredit";
import Cookies from "js-cookie";
import BarCharts from "../BarChart";


const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

class AdminDashboard extends Component{

    state = {sumOfDebit : "0"  , sumOfcredit : "0" , LastTransactionList : [] , barChartList : [],statusOfDisplay: positionOfDisplay.loading}

    componentDidMount(){
        this.getDebitAndCredit()
        this.getLastTransaction()
    }

    getLastTransaction = async() =>{
        const id = Cookies.get("user_id")
        const url = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${3}&offset=${0}`
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
        const updatedData = data.transactions.map((echValue) =>{
            const currentDate = new Date(echValue.date)
            const displayAMAndPM = currentDate.getHours() > 12 ? "PM" : "AM"
            const fullDateAndTime = currentDate.getDay()+1 + "-" + currentDate.getMonth() 
                + "-" + currentDate.getFullYear() + " " 
                + currentDate.getHours() + ":" 
                + currentDate.getMinutes() + " " + displayAMAndPM;
                return {...echValue , date : fullDateAndTime}
        })
        
        
        this.setState({LastTransactionList : updatedData})
    }


    getDebitAndCredit = async() =>{
        this.setState({statusOfDisplay: positionOfDisplay.loading})
        const url = `https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin`
        const options= {
            method : "GET" ,
            headers : {
                "Content-Type" : "application/json" ,
                "x-hasura-admin-secret" :"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF" ,
                "x-hasura-role" : "admin"
            } 
        }
        const response = await fetch(url , options)
        const data = await response.json()
        if(data.transaction_totals_admin.length !== 0){
            data.transaction_totals_admin.forEach((echValue) =>{
                if(echValue.type === "debit"){
                    this.setState({sumOfDebit : echValue.sum})
                }else if(echValue.type === "credit"){
                    this.setState({ sumOfcredit : echValue.sum })
                }
            })
            this.setState({statusOfDisplay: positionOfDisplay.success})
        }else{
            this.setState({sumOfDebit : "0" , sumOfcredit : "0" ,  statusOfDisplay: positionOfDisplay.success})
        }
        

    }

    InProccesing = () => (
        <div className="loader"><BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" /></div>
          
        
      )

    render(){
        const {sumOfDebit , sumOfcredit , statusOfDisplay, LastTransactionList} = this.state
        return(
            <div className="bg-container-Dashboard">
                <SideBar/>
                <div className="content-display-container">
                    <Navbar title="Dashboard"/>
                    <div className="container-of-ul">
                        {statusOfDisplay === "SUCCESS" ? (
                            <>
                                <SumOfDebitAndCredit sumOfDebit={sumOfDebit} sumOfcredit={sumOfcredit}/>
                                <h1 className="Last-Trasaction-text">Last Trasaction</h1>
                                <ListOfTrasactions title="Dashboard" TransactionsList={LastTransactionList}/>
                                <h1 className="barchart-text">Debit & Credit Overview</h1>
                                <BarCharts/>
                            </>
                        ) :(
                            this.InProccesing()
                        )}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AdminDashboard