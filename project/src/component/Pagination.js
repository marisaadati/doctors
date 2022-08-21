// import React from 'react';


// const Pagination=({postsPerPage,totalPosts,Paginate})=> {
//     const pageNumbers = [];

//     for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
//         pageNumbers.push(i);
//     }


//     const arr = [1,2,3,4,5,6,7]
//     // const onNext = () => {
//     //     onPageChange(currentPage + 1);
//     //   };
    
//     //   const onPrevious = () => {
//     //     onPageChange(currentPage - 1);
//     //   };
//     //   let lastPage = Pagination[Pagination.length - 1];
    

//     return (
//         <nav>
//             <ul className="pagination">
//             {/* <li
//         className={classnames('pagination-item', {
//           disabled: currentPage === 1
//         })}
//         onClick={onPrevious}
//       >
//         <div className="arrow left" />
//       </li> */}
//                 {/* {pageNumbers.map(number=>( */}
//                      {arr.map(number=>(
//                     <li key={number} className="page-item">
//                         <a onClick={()=> Paginate(number)} className='page-link'>
//                             {number}
//                         </a>

//                     </li>

//                 ))}
                
//             </ul>
            
//         </nav>
//     );
// }

// export default Pagination;