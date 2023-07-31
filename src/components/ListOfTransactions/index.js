import {BiUpArrowCircle , BiDownArrowCircle} from "react-icons/bi"
import {MdOutlineModeEditOutline} from "react-icons/md"
import {RiDeleteBinLine} from "react-icons/ri"

import "./index.css"
import Cookies from "js-cookie"

const ListOfTransactions = (props) =>{
    const {TransactionsList , title} = props
    console.log(TransactionsList)
    const id = Cookies.get("user_id")
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
                    <MdOutlineModeEditOutline className="edit-icon"/>
                    <RiDeleteBinLine className="delete-icon"/>
                </li>
            ))}
        </ul>
    )
}

export default ListOfTransactions