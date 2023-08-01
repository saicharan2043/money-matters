import {Component} from "react"

import Cookies from "js-cookie"

import "./index.css"
import { Redirect } from "react-router-dom"

class Login extends Component{
    state = {username : "" , password : "" , ErrorMsg : ""}


    

    sendRequest = async () => {
        const { username, password } = this.state;
        const {history} = this.props
        const url = 'https://bursting-gelding-24.hasura.app/api/rest/get-user-id';
        const userDetails = {
            email : username,
            password : password
        }
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
            },
            body : JSON.stringify(userDetails)

        };
    
        const Response = await fetch(url, option);
        const data = await Response.json();
        if(data.get_user_id.length !== 0){
            const {id} = data.get_user_id[0]
            Cookies.set("user_id" , JSON.stringify(id))
            {id === 3 ? history.replace("/admindashboard"):history.replace("/userdashboard")}
            
        }
        else{
            this.setState({ErrorMsg : "Please Enter valid details"})
        }
        
        
    }

    clickLoginBtn = (event) =>{
        event.preventDefault()
        const {username , password} = this.state
        if (username === ""){
            this.setState({ErrorMsg : "*Please Enter your Email"})
        }else{
            if (password === ""){
                this.setState({ErrorMsg : "*Please Enter your password"})
            }else{
                this.sendRequest()
            }
        }
    }

    changeEmail = (event) =>{
        this.setState({username : event.target.value})
    }

    changePassword = (event) =>{
        this.setState({password : event.target.value})
    }

    render(){
        const {username , password , ErrorMsg} = this.state
        const id = Cookies.get("user_id")
        if(id !== undefined){
            return id === "3" ? <Redirect to="/admindashboard"/> : <Redirect to="/userdashboard"/> 
        }
        return(
            <div className="first-container">
                <div className="left-bg-image">
                    <div className="left-bg-color">
                        <h1 className="left-side-heading">Welcome back!</h1>
                        <p className="left-side-paragraph">We are glad to see you again! instant credit, debit<br/>
                        & playouts trusted by millons worldwide.</p>
                    </div>
                </div>
                <form className="form-container" onSubmit={this.clickLoginBtn}>
                    <h1 className="login-heading">Log In</h1>
                    <label htmlFor="username" className="lable">Email address</label>
                    <input type="text" className="input" id="username" value={username} placeholder="Enter Your Email" onChange={this.changeEmail}/>
                    <label className="lable" htmlFor="password" >Password</label>
                    <input type="password" className="input" id="password" value={password} placeholder="Enter Password" onChange={this.changePassword}/>
                    <button className="btn-login" type="submit">Login</button> 
                    <p className="error-msg">{ErrorMsg}</p>
                </form>
            </div>
        )
    }
}

export default Login