import axios from "axios";
import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { userContext } from "../Contexte/Contexte";

function Admin() {

    const userData = useContext(userContext)    

    console.log(userData)
    return (
        <div className="Admin">
           <h1>Admin :</h1>

        </div>
    )
}

export default Admin