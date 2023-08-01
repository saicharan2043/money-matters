import {BiUpArrowCircle , BiDownArrowCircle} from "react-icons/bi"
import {MdOutlineModeEditOutline} from "react-icons/md"
import {RiDeleteBinLine} from "react-icons/ri"
import {GrFormClose} from "react-icons/gr"
import {FiAlertTriangle} from "react-icons/fi"
import Popup from 'reactjs-popup'

import "./index.css"
import Cookies from "js-cookie"
import AllContext from "../../context/AllContext"

const EachList = (props) =>{
    const id = Cookies.get("user_id")
    const {echValue, title} = props
    
    return(<AllContext.Consumer>
        {value=>{
            const {deleteBtnClick} = value

            const clickDeleteBtn = async() =>{
                deleteBtnClick(echValue.id)
                const url = "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction"
                const options= {
                    method : "DELETE" ,
                    headers : {
                        "Content-Type" : "application/json" ,
                        "x-hasura-admin-secret" :"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF" ,
                        "x-hasura-role" : "user" ,
                        "x-hasura-user-id" : id
                    }, 
                    body : JSON.stringify({id : echValue.id})
                }
                const response = await fetch(url , options)
                const data = response.json()
            }
                return(
                    <li className="all-items-list">
                        <div className="transaction-name-container">
                            {echValue.type === "debit" ? (
                                <BiDownArrowCircle className={`icon-transaction-name ${title !== undefined && "debit-color"}`}/>
                            ) : (
                                <BiUpArrowCircle className={`icon-transaction-name ${title !== undefined && "credit-color"}`}/>
                            )}
                            {id === "3" && <img src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp" className="profile-list-transaction"/>}
                            <p className="teaxt-transaction-name all-list-items-color">{echValue.transaction_name}</p>
                        </div>
                        <p className="Category-text all-list-items-color">{echValue.category}</p>
                        <p className="date-text all-list-items-color">{echValue.date}</p>
                        <p className={`amount-text ${echValue.type === "debit" ? "debit-color" : "credit-color"}`}>{echValue.type === "debit" ? "-" :"+"}{echValue.amount}</p>
                        {id !== "3" && (
                            <>
                            <MdOutlineModeEditOutline className="edit-icon"/>
                            
                            <Popup
                                modal
                                trigger={
                                    <RiDeleteBinLine className="delete-icon"/>
                                }
                                className="popup-content"
                            >
                                {close => (
                                <div className="PopupContainer-transactions">
                                    <FiAlertTriangle className="popup-icon" onClick={() => close()}/>
                                    <div className="right-container-of-popup">
                                        <div className="cancel-icon-container">
                                            <h1 className="HeadingPopup">
                                            Are you sure, you want to Delete
                                            </h1>
                                            <GrFormClose className="cancel-icon"/>
                                        </div>
                                        <p className="paragraph-popup">This transaction will be deleted immediately. You can't undo this action</p>
                                        <div className="ButtonsContainer">
                                            <button
                                                type="button"
                                                onClick={clickDeleteBtn}
                                                className="ButtonPopup"
                                            >
                                                Yes, Delete
                                            </button>
                                            <button
                                                onClick={() => close()}
                                                type="button"
                                                className="ButtonConfirm"
                                            >
                                                No, Leave it
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </Popup>
                            </>
                        )}
                    </li>
                )
            
    

        }}
    </AllContext.Consumer>)
    
}


const ListOfTransactions = (props) =>{
    const {TransactionsList , title} = props
    

    

    return(
        <ul className="ul-transactionsList">
            {title === undefined && (
                <li className="heading-list">
                    <div className="transaction-name-container">
                        <p className="teaxt-transaction-name">Trasaction Name</p>
                    </div>
                    <p className="Category-text">Category</p>
                    <p className="date-text">Date</p>
                    <p className="amount-text">Amount</p>
                </li>
            )}
            
            {TransactionsList.map((echValue) =>(
                <EachList echValue={echValue} title={title}key={echValue.id}/>
            ))}
        </ul>
    )
}

export default ListOfTransactions