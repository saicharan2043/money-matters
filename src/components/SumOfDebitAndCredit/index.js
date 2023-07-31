import "./index.css"

const SumOfDebitAndCredit = (props) =>{
    const {sumOfDebit , sumOfcredit} = props
    console.log(sumOfcredit)
    console.log(sumOfDebit)
    return(
        <div className="debit-and-credit-container">
            <div className="credit-container">
                <div className="money-and-credit-container">
                    <p className="money-of-credit">${sumOfcredit}</p>
                    <p className="text-of-credit">Credit</p>
                </div>
                <img src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1690714715/Group_1_s1fgm5.png" className="image-credit"/>
            </div>

            <div className="debit-container">
                <div className="money-and-credit-container">
                    <p className="money-of-debit">${sumOfDebit}</p>
                    <p className="text-of-credit">Debit</p>
                </div>
                <img src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1690714727/Group_jlmdmx.png" className="image-credit"/>
            </div>
        </div>
    )
}



export default SumOfDebitAndCredit