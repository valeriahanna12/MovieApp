// import React from 'react'

// export default function Profile(props) {
//   return <>
//     <div className="d-flex align-item-center">
//       <div>
//         <h2 >Name : {props.userData.name}</h2>
//         <h2 >Phone : {props.userData.phone}</h2>
//         <h2 >Email : {props.userData.email}</h2>
//       </div>
//     </div>
//   </>
// }
import React from "react";

export default function Profile({ userData }) {
    let { name, phone, email } = userData;
    return (
        <>
            <h2 className="h1 text-decoration-underline pb-4">
                Account Details :
            </h2>
            <h2 className="my-3 ">Name: {name}</h2>
            {/* <h2 className="my-3">Phone: {phone}</h2>
            <h2 className="my-3">Email: {email}</h2> */}
        </>
    );
}
