import { useEffect , useState} from "react"

import {AiFillHome} from "react-icons/ai"
import {FaMoneyBillTransfer} from "react-icons/fa6"
import {CgProfile} from "react-icons/cg"
import {MdOutlineLogout} from "react-icons/md"
import {GrFormClose} from "react-icons/gr"
import {LuLogOut} from "react-icons/lu"
import AllContext from "../../context/AllContext"
import "./index.css"
import { Link , withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import Popup from 'reactjs-popup'
import {Bars} from 'react-loader-spinner'


const sidBarTabs = [
    {id : 1 , title : "Dashboard", icon : "AiFillHome" , routeName : "/userdashboard"} ,
    {id : 2 , title : "Trasactions", icon : "FaMoneyBillTransfer", routeName : "/trasactions"},
    {id : 3 , title : "Profile", icon : "CgProfile" , routeName : "/ProfileTab"}
]

const id = Cookies.get("user_id")

const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

const TabsOfSidebar = (props) =>{
    const {echValue} = props
    const getIcons = (expression) =>{
        switch (expression) {
            case "AiFillHome":
                return <AiFillHome className="icon-tab"/>
                break;
            case "FaMoneyBillTransfer":
                return <FaMoneyBillTransfer className="icon-tab"/>
                break;
            default:
                return <CgProfile className="icon-tab"/>
                break;
        }
    }

    return(
        <AllContext.Consumer>
            {value=>{
                const {sideBarActiveId , clickSideBarTab} = value
                const clickTab = ()=>{
                    clickSideBarTab(echValue.id)
                }
                return(
                    <Link to={echValue.routeName === "/userdashboard" ? (id === "3" ?"/admindashboard" : "/userdashboard") :(echValue.routeName)} className="link">
                        <li className={`list-of-side-tabs ${sideBarActiveId === echValue.id &&"active-tab"}`} onClick={clickTab}>
                            {getIcons(echValue.icon)}
                            <p className="text-tab">{echValue.title === "Trasactions" ? (id === "3" ?"All Trasactions" : "Trasactions") :(echValue.title)}</p>
                        </li>
                    </Link>
                )
            }}
        </AllContext.Consumer>
    )

    
}

const SideBar = (props) =>{
    
    const [profileDetails , setProfileDetails] = useState({})
    const [position , setPosition] = useState(positionOfDisplay.loading)

    useEffect(()=>{
        getProfileData()
    } , [])

    const getProfileData = async() =>{
        const id = Cookies.get("user_id")
        setPosition(positionOfDisplay.loading)
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
        setPosition(positionOfDisplay.success)
    }
    

    

    const logout = () =>{
        const {history} = props
        Cookies.remove("user_id")
        history.replace("/login")
    }

    const InProccesing = () => (
        <div className="loader"><Bars type="ThreeDots" color="#4f46e5" height="50" width="50" /></div>
          
        
      )

    return(
        <AllContext.Consumer>
            {value=>{
                const {clickSideBarTab} = value
                const sideBarClick = () =>{
                    clickSideBarTab(1)
                }   
                return(
                    <>
                    <nav className="sidebar">
                        <div className="top-container">
                            <Link to={id === "3" ? "/admindashboard" : "/userdashboard"} className="link">
                                <img src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1690714704/Frame_507_xhhorp.png" className="app-log" onClick={sideBarClick}/>
                            </Link>
                            <ul className="ul-side-tab">
                                {sidBarTabs.map((echValue) =>(
                                    <TabsOfSidebar echValue ={echValue} key={echValue.id}/>
                                ))}
                            </ul>
                        </div>
                        {position === "SUCCESS" ? (

                        
                            <div className="profile-container-sidebar">
                                    <img src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp" className="profile-sidebar"/>
                                    <div className="name-email-container">
                                        <div className="name-logout-container">
                                            <p className="name">{profileDetails.name}</p>
                                            <Popup
                                                modal
                                                trigger={
                                                    <MdOutlineLogout className="logout-icon"/>
                                                }
                                                className="popup-content"
                                            >
                                                {close => (
                                                <div className="PopupContainer">
                                                    <LuLogOut className="popup-icon" onClick={() => close()}/>
                                                    <div className="right-container-of-popup">
                                                        <div className="cancel-icon-container">
                                                            <h1 className="HeadingPopup">
                                                            Are you sure, you want to logout
                                                            </h1>
                                                            <GrFormClose className="cancel-icon"/>
                                                        </div>
                                                        <p className="paragraph-popup">Lorem ipsum dolor sit amet, constectetur adipiscing elit, sed</p>
                                                        <div className="ButtonsContainer">
                                                            <button
                                                                type="button"
                                                                onClick={logout}
                                                                className="ButtonPopup"
                                                            >
                                                                Yes, Logout
                                                            </button>
                                                            <button
                                                                onClick={() => close()}
                                                                type="button"
                                                                className="ButtonConfirm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </Popup>
                                            
                                        </div>
                                        <p className="email-text">{profileDetails.email}</p>
                                    </div>
                                </div>
                            ):(
                                <div className="profile-container-sidebar">
                                    {InProccesing()}
                                </div>
                            )}
                    </nav>
                    </>
                )
            }}
        </AllContext.Consumer>
    )
    
}

export default withRouter(SideBar)