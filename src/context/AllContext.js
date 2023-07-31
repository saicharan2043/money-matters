import React from "react"

const AllContext = React.createContext({
    sideBarActiveId : 1 ,
    clickSideBarTab : () =>{} ,
    navBarActtiveId : 1,
    clickNavBarTab : () =>{}
})

export default AllContext