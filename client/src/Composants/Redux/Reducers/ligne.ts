import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

// type Ligne = {
//     id: string | null,
//     element: string,
//     desc: string,
//     tva: number,
//     qte: number,
//     remise: number,
//     pu: number,
//     pr: number,
//     txmarque: number,
//     totalht: number
// }

type Ligne = {
    element : string,
    desc : string,
    qte: number,
    remise : number,
    tva: number | null,
    pu: number,
    pr: number | null,
    cat: string,
    type: string,
}

const initialState :any = {
    data: []
}

// const lignes: Array<ligne> 
// const [lignes, setLignes] = useState<Array<ligne>>([])

// const [element, setElement] = useState<string>("")
// const [desc, setDesc] = useState<string>("")
// const [tva, setTva] = useState<number>()
// const [qte, setQte] = useState<number>()
// const [remise, setRemise] = useState<number>()
// const [pu, setPu] = useState<number>()
// const [pr, setPr] = useState<number>()
// const [txmarque, setTxmarque] = useState<number>()
// const [totalht, setTotalht] = useState<number>()


export const getLigne: any = createAsyncThunk("/api/ligne/liste", async () => {
    let reponse : AxiosResponse = await axios.get('/api/ligne/liste')

    return reponse.data
})

export const addLigne: any = createAsyncThunk("/api/ligne/ajout", async (data) => {

    let reponse : AxiosResponse = await axios.post("/api/ligne/ajout", {
        data: data
    })

    console.log(reponse.data)

    return reponse.data
    
})

export const ligne = createSlice ({
    name:'ligne',
    initialState,
    reducers:{},
    extraReducers :{
        [getLigne.fulfilled]: (state, action: PayloadAction<Array<Ligne>>) => {
            state.data = action.payload
        },
        [addLigne.fulfilled]: (state, action: PayloadAction<Array<Ligne>>) => {
            state.data = action.payload
        }
    }
})

export default ligne.reducer