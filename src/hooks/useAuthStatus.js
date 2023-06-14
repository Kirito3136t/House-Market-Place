import React from 'react'
import {useEffect,useState} from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'

const useAuthStatus = () => {
    const[loggedIn,setLoggedIn]=useState(false)
    const[checkingStatus,setCheckingStataus]=useState(true)
    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStataus(false)
        })
    })


  return {loggedIn,checkingStatus}
}

export default useAuthStatus
