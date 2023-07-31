import {AiOutlinePlus} from "react-icons/ai"

import "./index.css"
import Cookies from "js-cookie"
import AllContext from "../../context/AllContext"

const TabsOfTransactions = (props) =>{
    const {echValue} = props
    const {name, id} = echValue
    return(
        <AllContext.Consumer>
            {value=>{
                const {navBarActtiveId , clickNavBarTab} = value
                const clickTab =()=>{
                    clickNavBarTab({id , name})
                }
                return(
                    <li className={`list-of-nav ${navBarActtiveId.id === id && "actibe-tab-nav"}`} onClick={clickTab}>{name}</li>
                )
            }}
        </AllContext.Consumer>
    )
    
}

const Navbar = (props) =>{
    const {title , navBarTabs} = props
    const id = Cookies.get("user_id")
    return(
        <nav className="navbar-bg">
            <div className="container-of-title-btn">
                <h1 className="title-of-nav">{title}</h1>
                {id !== "3" && (
                    <div className="container-of-btn">
                        <AiOutlinePlus className="icon-of-btn"/>
                        <p className="text-of-btn">Trasaction</p>
                    </div>
                )}
                
            </div>
            {navBarTabs !== undefined && (
                <ul className="ul-of-nav">
                   {navBarTabs.map((echValue)=>(
                    <TabsOfTransactions echValue={echValue} key={echValue.id}/>
                   ))}
                </ul>
            )}
            
        </nav>
    )
}

export default Navbar