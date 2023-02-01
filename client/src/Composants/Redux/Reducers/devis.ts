import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios, { AxiosResponse} from "axios"

type devis = {
    totalht : number,
    totaltva: number,
    totalttc: number,
} 

const initialState : any = {
    data: []
}

export const getDevis : any = createAsyncThunk('/api/devis/liste', async () => {

    let reponse : AxiosResponse = await axios.get('/api/devis/liste' )

    return reponse.data
})

export const devis = createSlice ({
    name:'devis',
    initialState,
    reducers:{},
    extraReducers :{
        [getDevis.fulfilled]: (state, action: PayloadAction<Array<devis>>) => {
            state.data = action.payload
        },
    }
})


export default devis.reducer