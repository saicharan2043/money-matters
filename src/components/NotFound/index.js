import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import './index.css'

const NotFound = props => {
  const GotToDashBoard = () => {
    const id = Cookies.get("user_id")
    const {history} = props
    console.log(props)
    {id === 3 ? history.replace("/admindashboard"):history.replace("/userdashboard")}
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003861/Layer_1_ljqucq.jpg"
        className="img-notfound"
        alt="page not found"
      />
      <h1 className="text-notfound">Page Not Found</h1>
      <p className="discription-notfound">
        We are sorry, the page you requested could not be found. Please go back
        to the DashBoard.
      </p>
      <button className="button-notfound" onClick={GotToDashBoard}>
       DashBoard
      </button>
    </div>
  )
}

export default withRouter(NotFound)