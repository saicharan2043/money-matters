import {Redirect , Route} from "react-router-dom"
import Cookies from 'js-cookie'

const ProtectedRouter  = (props) =>{
    const id = Cookies.get("user_id")
    if (id === undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>
}

export default ProtectedRouter