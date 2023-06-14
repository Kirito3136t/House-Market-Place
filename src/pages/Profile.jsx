import React from 'react'
import {getAuth,updateProfile} from 'firebase/auth'
import { useState , useEffect} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import {updateDoc , doc ,deleteDoc,orderBy,query,collection,getDocs,where, Timestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'


function Profile() {
    const auth = getAuth()
    const [changeDetails,setChangeDetails]=useState(false)

    const [listings,setListings] = useState(null)
    const [loading,setLoading] = useState(true)

    const[formData,setFormData]=useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email,
    })

    const {name,email}=formData

    const navigate = useNavigate()

    const onEdit=(listingId)=>{
        navigate(`/edit-listing/${listingId}`)
    }

    useEffect(()=>{
        const fetchUserListing = async() =>{
            const listingRef = collection(db,'listings')
            const q = query(listingRef,where('userRef', '==', auth.currentUser.uid),orderBy('timestamp','desc'))

            const querySnap = await getDocs(q)
             
            let listings=[]

            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            console.log(listings)
            setListings(listings)
            setLoading(false)
        }
        fetchUserListing()
    },[auth.currentUser.uid])

    const onLogout=()=>{
        auth.signOut()
        navigate('/')

    }
    
    const onSubmit=async()=>{
        try {
            if(auth.currentUser.displayName!==name){
                
                await updateProfile(auth.currentUser,{
                    displayName:name,
                })
                const userRef=doc(db,'users',auth.currentUser.uid)
                await updateDoc(userRef,{
                    name,
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Could Not Update')

            
        }
    }
    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value,
        }))

    }

    const onDelete = async (listingId)=> {
        if(window.confirm('Are you sure you want to delete ? ')){
            await deleteDoc(doc(db,'listings',listingId))
            
            const updatedListings = listings.filter((listing)=>
                listing.id !== listingId
                )
                setListings(updatedListings)
                toast.success('Succesfully Deleted')
        }

    }

    

  return <div className='profile'>
    <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>Logout</button>
    </header>
    <main>
        <div className="profileDetailsHeader">
            <p className='profileDetailsText'>Personal Details</p>
            <p className="changePersonalDetails" onClick={()=>{
                 changeDetails && onSubmit()
                setChangeDetails((prevState)=>!prevState)
            }}>
                {changeDetails ? 'done' : 'change'}
            </p>
        </div>
        <div className="profileCard">
            <form>
                <input 
                type='text' 
                id='name' 
                className={!changeDetails?'profileName':'profileNameActive'} 
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
                />
                <input 
                type='text' 
                id='email' 
                className={!changeDetails?'profileEmail':'profilEmailActive'} 
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
                />
            </form>
        </div>
        <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt='home'/>
            <p>Create Your Listing</p>
            <img src={arrowRight} alt='arrow'/>
        </Link>

        {!loading && listings?.length > 0 && (
            <>
            <p className="listingText">Your Listings</p>
            <ul>
                {listings.map((listing)=>(
                    <ListingItem 
                    key={listing.id} 
                    listing={listing.data} 
                    id={listing.id} 
                    onDelete={()=>onDelete(listing.id)}
                    onEdit={()=>onEdit(listing.id)}
                    />
                ))}
            </ul>
            </>
        )}
    </main>
  </div>
}

export default Profile