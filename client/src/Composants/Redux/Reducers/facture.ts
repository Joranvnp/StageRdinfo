import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios, { AxiosResponse} from "axios"

type facture = {
    totalht : number,
    totaltva: number,
    totalttc: number,
} 

const initialState : any = {
    data: []
}

export const getFacture : any = createAsyncThunk('/api/facture/list', async () => {

    let reponse : AxiosResponse = await axios.get('/api/facture/list' )

    return reponse.data
})

export const facture = createSlice ({
    name:'facture',
    initialState,
    reducers:{},
    extraReducers :{
        [getFacture.fulfilled]: (state, action: PayloadAction<Array<facture>>) => {
            state.data = action.payload
        },
    }
})


export default facture.reducer