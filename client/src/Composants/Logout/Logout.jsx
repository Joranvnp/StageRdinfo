import axios from "axios";
import React, { useState, useEffect } from "react";

function Logout() {

    useEffect(() => {
        axios.post('/api/logout').then(reponse => {
            console.log(reponse)
            if(reponse.data === "ok")
            {
                document.location.href = "/"
            }
        })
    }, [])

    return null
}

export default Logout