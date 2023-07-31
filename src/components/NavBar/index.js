import {AiOutlinePlus} from "react-icons/ai"

import "./index.css"

const Navbar = (props) =>{
    const {title , navBarTabs} = props
    return(
        <nav className="navbar-bg">
            <div className="container-of-title-btn">
                <h1 className="title-of-nav">{title}</h1>
                <div className="container-of-btn">
                    <AiOutlinePlus className="icon-of-btn"/>
                    <p className="text-of-btn">Trasaction</p>
                </div>
            </div>
            {navBarTabs !== undefined && (
                <ul className="ul-of-nav">
                   {navBarTabs.map((echValue)=>(
                    <li key={echValue.id} className="list-of-nav">{echValue.name}</li>
                   ))}
                </ul>
            )}
            
        </nav>
    )
}

export default Navbar