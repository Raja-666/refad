import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetkycdataQuery } from 'src/app/services/adminkyc'
import { useGetfindsingleuserQuery } from 'src/app/services/usrerList'

const Kyc = () => {
  const { id } = useParams()

  const { isError, isLoading, isSuccess, data } = useGetkycdataQuery(id)

  console.log(id, '0000')

  const {
    isError: Error,
    isLoading: load,
    isSuccess: success,
    data: userdata,
  } = useGetfindsingleuserQuery(id)
  let a

  if (isError) {
    a = <p>error</p>
  }
  if (isLoading) {
    a = <p>loading</p>
  }

  if (Error) {
    a = <p>error</p>
  }
  if (load) {
    a = <p>loading</p>
  }
  console.log(success && userdata.userlist.profile.firstName)

  return (
    // <div>
    //   {data.map((item) => (
    //      { item.panCard}
    //   ))}
    //   {a}
    // </div>

    // <div>
    //   <div className=" row row-cols-md-2">
    //     {isSuccess &&
    //       data.map((item) => (
    //         <div key={item.id}>
    //           <div className="col">
    //             <div className="card">
    //               <div className=" card-header text-center">
    //                 <h4>{item._id}</h4>
    //                 <div className="row row-cols-2 g-2">
    //                   <div className="col">
    //                     <img
    //                       className="img-fluid"
    //                       src={`http://localhost:30000${item.frontSideImg}`}
    //                       alt=""
    //                     />
    //                   </div>
    //                   <div className="col">
    //                     <img
    //                       className="img-fluid"
    //                       src={`http://localhost:30000${item.backSideImg}`}
    //                       alt=""
    //                     />
    //                   </div>
    //                   <div className="col">
    //                     <img
    //                       className="img-fluid"
    //                       src={`http://localhost:30000${item.kycSelfieImg}`}
    //                       alt=""
    //                     />
    //                   </div>
    //                   <div className="col">
    //                     <button className="btn btn-success">Accept</button>
    //                     <button className="btn btn-danger ">Denied</button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           {/* {item._id}

    //           <img src={`http://localhost:30000${item.frontSideImg}`} alt="" /> */}
    //         </div>

    //         // Added span and key
    //       ))}
    //   </div>
    // </div>

    <div>
      {a}
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Quote</p>
            <footer className="blockquote-footer">
              Footer
              <cite title="Source title">Source title</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default Kyc
