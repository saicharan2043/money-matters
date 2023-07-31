import {BiUpArrowCircle , BiDownArrowCircle} from "react-icons/bi"
import {MdOutlineModeEditOutline} from "react-icons/md"
import {RiDeleteBinLine} from "react-icons/ri"

import "./index.css"

const ListOfTrasactions = (props) =>{
    const {TrasactionsList , title} = props
    return(
        <ul className="ul-TrasactionsList">
            {title === undefined && (
                <li className="heading-list">
                    <div className="trasaction-name-container">
                        <p className="teaxt-trasaction-name">Trasaction Name</p>
                    </div>
                    <p className="Category-text">Category</p>
                    <p className="date-text">Date</p>
                    <p className="amount-text">Amount</p>
                </li>
            )}
            
            {TrasactionsList.map((echValue) =>(
                <li className="all-items-list">
                    <div className="trasaction-name-container">
                        {echValue.type === "debit" ? (
                            <BiDownArrowCircle className={`icon-trasaction-name ${title !== undefined && "debit-color"}`}/>
                        ) : (
                            <BiUpArrowCircle className={`icon-trasaction-name ${title !== undefined && "credit-color"}`}/>
                        )}
                        
                        <p className="teaxt-trasaction-name all-list-items-color">{echValue.transaction_name}</p>
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

export default ListOfTrasactions