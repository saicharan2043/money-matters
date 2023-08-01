import React from "react"

const AllContext = React.createContext({
    sideBarActiveId : 1 ,
    clickSideBarTab : () =>{} ,
    navBarActtiveId : {id : 1 , name : "All Transactions"},
    clickNavBarTab : () =>{},
    deleteId : "" ,
    deleteBtnClick : () =>{}
})

export default AllContext