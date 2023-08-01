import { Component } from "react";

import SideBar from "../Sidebar";
import Navbar from "../NavBar";
import {BallTriangle} from 'react-loader-spinner'
import Cookies from "js-cookie";
import "./index.css"
import "../UserDashboard/index.css"


const ProfileCode = (props) =>{
    const {title , value} = props
    return(
        <div className="each-tab-container">
            <p className="title-of-each-tab">{title}</p>
            <input type="text" value={value !== null ? value : "null"} className="value-of-each-tab"/>
        </div>
    )
}


const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

class ProfileTab extends Component{

    state = {profileDetails : {},statusOfDisplay: positionOfDisplay.loading}

    componentDidMount(){
        this.getProfileDetails()
    }

    getProfileDetails = async() =>{
        const id = Cookies.get("user_id")
        const url = `https://bursting-gelding-24.hasura.app/api/rest/profile`
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
        this.setState({profileDetails : data.users[0] , statusOfDisplay: positionOfDisplay.success})
    }

    
    

    InProccesing = () => (
        <div className="loader"><BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" /></div>
          
        
      )

    render(){
        const {profileDetails , statusOfDisplay} = this.state
        return(
            <div className="bg-container-Dashboard">
                <SideBar/>
                <div className="content-display-container">
                    <Navbar title="Profile"/>
                    <div className="container-of-ul">
                        {statusOfDisplay === "SUCCESS" ? (
                            <div  className="profile-container">
                                <div className="profile-pic">
                                    <p className="first-letter-of-profile">{profileDetails.name[0].toUpperCase()}</p>
                                </div>
                                <div className="user-details-container">
                                    {<ProfileCode title="Your Name" value={profileDetails.name}/>}
                                    {<ProfileCode title="Email" value={profileDetails.email}/>}
                                    {<ProfileCode title="Date of Birth" value={profileDetails.date_of_birth}/>}
                                    {<ProfileCode title="Permanent Address" value={profileDetails.permanent_address}/>}
                                    {<ProfileCode title="Postal Code" value={profileDetails.postal_code}/>}
                                    {<ProfileCode title="User Name" value={profileDetails.name}/>}
                                    {<ProfileCode title="Password" value="********"/>}
                                    {<ProfileCode title="Present Address" value={profileDetails.present_address}/>}
                                    {<ProfileCode title="City" value={profileDetails.city}/>}
                                    {<ProfileCode title="Country" value={profileDetails.country}/>}
                                </div>
                            </div>
                        ) :(
                            this.InProccesing()
                        )}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ProfileTab