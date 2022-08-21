import React,{ Component, useEffect, useState } from 'react';
import { Link ,   Routes,
    Route,BrowserRouter, useParams
  } from "react-router-dom";
  import InstagramIcon from '@mui/icons-material/Instagram';
  import TelegramIcon from '@mui/icons-material/Telegram';
  

  
  export default function Drprofile(){
    const [thisuser,setThisuser]= useState(null)

    const {id} = useParams()

    useEffect(() => {
        fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
        .then((res)=>res.json())
        .then((data)=> setThisuser(data))
    }, [])

    console.log(thisuser);
    if (!thisuser) return <h1> loading</h1>


    return(
      <div className='drpage'>
        <div>
          <p className='namebox'>
          {thisuser.doctor.fname} {thisuser.doctor.lname}
          </p>
          <p className='subname'>
          {/* {thisuser.doctor.spUnis[0].specialty.name} */}
          {
            thisuser.doctor.spUnis.map(item => item.specialty.name + '/')
          }
          </p>
        </div>
        <div>
        <img className='doctorprf' src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${thisuser.doctor.url}`}/>
        </div>
        <div className='instagram'>
       <InstagramIcon className='icon'/><a id="style-2" data-replace="Instagram"><span>@{thisuser.doctor.clinics[0].instagram}</span></a>
        <br/>
        <br/>
        <TelegramIcon className='icon'/><a id="style-2"data-replace="Telegram" ><span>{thisuser.doctor.clinics[0].telegram}</span></a>
        </div>
        <div>
          <span className='service'>
            خدمات
          </span>
          <p className='about'>
            {thisuser.doctor.clinics[0].about}
          </p>
        </div>
        <div className='box-container'>
          <div className='box1 flip-card'>
            <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <span>
            کلینیک
            </span>
          
            
     
          </div>
          <div className='flip-card-back'>
          {thisuser.doctor.clinics[0].name}
          <br/>
          {thisuser.doctor.clinics[0].clinicsTimeSheets[0].label}
          <br/>
        از ساعت{thisuser.doctor.clinics[0].clinicsTimeSheets[0].startTime}
          <br/>
          </div>
          </div>
          </div>

          <div className='box1 flip-card'>
          <div className='flip-card-inner'>
          <div className='flip-card-front'>
          <span>
            آدرس
            </span>

            </div>
            <div className='flip-card-back'>
            {thisuser.doctor.clinics[0].address}
            </div>
          
          </div>
          </div>
          <div className='box1 flip-card'>
          <div className='flip-card-inner'>
          <div className='flip-card-front'>
          <span>
          راه‌های ارتباطی
            </span>


            </div>
            <div className='flip-card-back'>
            {thisuser.doctor.clinics[0].telePhones[0].phone}
            <br/>
            {thisuser.doctor.clinics[0].webSite}
            </div>
          
          </div>
          </div>
                      
        </div>


        
        
        
        </div>
    )



  }
  
  