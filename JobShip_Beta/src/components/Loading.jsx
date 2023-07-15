import React from 'react'

const JobRecord_Icon = {
  imgAddess: "/Loading.gif",
};

const Loading = () => {
  return (
    <div>
      <img src={JobRecord_Icon.imgAddess} style={{height:"100px",width:"100px",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}/>
    </div>
  )
}

export default Loading