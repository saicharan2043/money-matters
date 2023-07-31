import { useEffect , useState} from "react"

import {AiFillHome} from "react-icons/ai"
import {FaMoneyBillTransfer} from "react-icons/fa6"
import {CgProfile} from "react-icons/cg"
import {MdOutlineLogout} from "react-icons/md"
import AllContext from "../../context/AllContext"
import "./index.css"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
// const sidBarTabs = [
//     {id : 1 , title : "Dashboard", icon : "AiFillHome"} ,
//     {id : 2 , title : "Trasactions", icon : "FaMoneyBillTransfer"},
//     {id : 3 , title : "Profile", icon : "CgProfile"}
// ]

const SideBar = () =>{

    const [profileDetails , setProfileDetails] = useState({})

    useEffect(()=>{
        getProfileData()
    } , [])

    const getProfileData = async() =>{
        const id = Cookies.get("user_id")
        const url = "https://bursting-gelding-24.hasura.app/api/rest/profile"
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
        setProfileDetails(data.users[0])
    }

    // const getIcons = (expression) =>{
    //     switch (expression) {
    //         case "AiFillHome":
    //             return <AiFillHome className="icon-tab"/>
    //             break;
    //         case "FaMoneyBillTransfer":
    //             return <FaMoneyBillTransfer className="icon-tab"/>
    //             break;
    //         default:
    //             return <CgProfile className="icon-tab"/>
    //             break;
    //     }
    // }



    return(
        <AllContext.Consumer>
            {value=>{
                const {sideBarActiveId , clickSideBarTab} = value
                // const sideBarClick = () =>{

                // }
                return(
                    <nav className="sidebar">
                        <div className="top-container">
                            <Link to="/userdashboard" className="link">
                                <img src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1690714704/Frame_507_xhhorp.png" className="app-log"/>
                            </Link>
                            <ul className="ul-side-tab">
                                <Link to="/userdashboard" className="link">
                                    <li className={`list-of-side-tabs`} >
                                        <AiFillHome className="icon-tab"/>
                                        <p className="text-tab">Dashboard</p>
                                    </li>
                                </Link>
                                <Link to="/trasactions" className="link">
                                    <li className={`list-of-side-tabs`}>
                                        <FaMoneyBillTransfer className="icon-tab"/>
                                        <p className="text-tab">Trasactions</p>
                                    </li>
                                </Link>
                                <Link to="/ProfileTab" className="link">
                                    <li className={`list-of-side-tabs`}>
                                        <CgProfile className="icon-tab"/>
                                        <p className="text-tab">Profile</p>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div className="profile-container-sidebar">
                                <img src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp" className="profile-sidebar"/>
                                <div className="name-email-container">
                                    <div className="name-logout-container">
                                        <p className="name">{profileDetails.name}</p>
                                        <MdOutlineLogout className="logout-icon"/>
                                    </div>
                                    <p className="email-text">{profileDetails.email}</p>
                                </div>
                            </div>
                    </nav>
                )
            }}
        </AllContext.Consumer>
    )
    
}

export default SideBar