import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {db} from '../firebase.config'
import { collection,getDocs,query,orderBy,limit } from 'firebase/firestore'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from './Spinner'
// Swipercore.use([Navigation,Pagination,Scrollbar,A11y])
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

function Slider() {
  const [loading,setLoading]=useState(true)
  const [listings,setListings]=useState(null)

  const navigate=useNavigate()

  useEffect(
    ()=> {
    const fetchlisting = async() => {
    const listingRef = collection(db,'listings')
    const q =query(listingRef,orderBy('timestamp','desc'),limit(5))
    const querySnap = await getDocs(q)

    let listings=[]

    querySnap.forEach((doc)=>{
      return listings.push({
        id:doc.id,
        data:doc.data(),

      })
    })
    console.log(listings)
    setLoading(false)
    setListings(listings)
  }

  fetchlisting()

  },[])

  if(loading){
    return <Spinner/>
  }

  if(listings.length === 0){
    return ( <></>)
  }

  return (
    listings && (
      <>
      <p className="exploreHeading">Recommended</p>
      
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  height: "20rem",
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </>
    )
  )
}

export default Slider