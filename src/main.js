import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";

function GithubProfile(){
  return (
   <>
      <Header></Header>
      <Body></Body>
   </>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(<GithubProfile/>);