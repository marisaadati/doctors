import React, { Component, useState } from 'react';
import './App.css';
import './loading.css';
import ReactPaginate from 'react-paginate';

import Pagination from './component/Pagination';
// import React,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Drprofile from './component/Drprofile';
import Loading from './component/Loading'

class App extends Component {
  constructor(){
    super();
    this.state={
    doctors:[],
    card:'',
    isVisible: false,
    currentPage: 1,
    totalPosts: 0,
    isLoading: false,
  };
}

showModal=(user)=>{
  this.setState({
    isVisible:true,
    user:user,
  }
  )
}
 hidemodal=()=>{
   this.setState({
     isVisible:false,

   })
 }



  componentDidMount(){
    fetch(`https://www.tebinja.com/api/v1/doctors/searchi?page=0`)
    .then((res)=>res.json())
    .then((data)=>{
      if(!data.success) return this.setState({hasError:true})
      console.log('data : ', data)
      const arr= data.doctors.hits.map(items=>items._source)  
      this.setState({doctors:arr, totalPosts: data.doctors.total})
    })
  }

  fetchOnClick = (number) => {
    this.setState({isLoading: true, doctors:[]})
    fetch(`https://www.tebinja.com/api/v1/doctors/searchi?page=${number}`)
    .then((res)=>res.json())
    .then((data)=>{
      if(!data.success) return this.setState({hasError:true})
      console.log('data : ', data)
      const arr= data.doctors.hits.map(items=>items._source)  
      this.setState({doctors:arr, totalPosts: data.doctors.total, isLoading: false})
    })
  }


  
  render() {
    const searchHandler=event=>{
      this.setState({card:event.target.value})
    }
    
    const indexOfLastPost= this.state.currentPage*10;

    const handlePageClick = (event) => {
      this.fetchOnClick(event.selected)
      // const newOffset = (event.selected * 10) % this.state.totalPosts;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      // setItemOffset(newOffset);
    };

   if(this.state.hasError)return <h1>Error0</h1>


    return (
      <>
      <div className='container-card'>
      

        {
          this.state.isLoading
          ?
          <Loading />
          :
          null
        }
        <div className='search-container'>
          <input type="text" placeholder='Search' className='search-input'
            value={this.state.card}
            onChange={searchHandler}
          />
          <a href="#" class="search-btn">
            <i class="fas fa-search"></i>      
          </a>
        </div>

         {
           this.state.isVisible
            ?
            <>
              <div className='modalbox'>

                <div>
                  <img
                   className='profimg' 
                   id='img-modal' 
                   src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${this.state.user.url}`}
                  />
                  <button className='modal-btn'>
تماس                              
                  </button>

                  <Link to={`/Drprofile/${this.state.user.id}`} className='modal-btn' id='btn-exception'> اطلاعات پزشک</Link>


                </div>
              </div>
                  
              <div className='backdrop' onClick={this.hidemodal}>

              </div>
            </>
            :
            null
          }
                  

        
          {this.state.doctors
            .filter(userdata=>{
              return(
                (userdata.fname.toLowerCase().includes(this.state.card.toLowerCase()))
              )
            })
            .map(doctor=>{
              return(
                <div>
              
                  <div className='drprofile'>
                  <p>
                    <img className='profimg' src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${doctor.url}`}/>
                  </p>
          
                  <p className='drinfo'>
                    {doctor.fname} {doctor.lname}
                  </p>
                  <p className='drcode'>
کد پزشکی:                    {doctor.pezeshkCode}
                  </p>
                  <button className='btn'
                    onClick={()=>this.showModal(doctor)}
                  >
اطلاعات بیشتر                         
                  </button>

                </div>
                
                </div>
              )
            })
            
          }
          
      </div>
      <div className='paginate-custom' >
      <ReactPaginate 
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={this.state.totalPosts}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
      />
      </div>
      </>
    );
  }
}

export default App;