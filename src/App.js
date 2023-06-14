import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Explore from './pages/Explore';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoutes from './components/PrivateRoutes';
import Offer from './pages/Offer';
import CreateListingPage from './pages/CreateListing';
import {ToastContainer} from 'react-toastify';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import EditListing from './pages/EditListing';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/offer' element={<Offer/>}/>
          <Route path='/category/:categoryName' element={<Category/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/profile' element={<PrivateRoutes/>}>
          <Route path='/profile' element={<Profile/>}/>   
          </Route>      
          <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
          <Route path='/contact/:landlordId' element={<Contact/>}/>
          <Route path='/edit-listing/:listingId' element={<EditListing/>}/>
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
      
    </>
  );
}

export default App;
