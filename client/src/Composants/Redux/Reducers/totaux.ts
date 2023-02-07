import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios, { AxiosResponse} from "axios"

type totaux = {
    totalht : number,
    totaltva: number,
    totalttc: number,
} 

const initialState : any = {
    data: []
}

export const getTotaux : any = createAsyncThunk('/api/totaux/list', async () => {

    let reponse : AxiosResponse = await axios.get('/api/totaux/list' )

    return reponse.data
})


export const totaux = createSlice ({
    name:'totaux',
    initialState,
    reducers:{},
    extraReducers :{
        [getTotaux.fulfilled]: (state, action: PayloadAction<Array<totaux>>) => {
            state.data = action.payload
        },
    }
})

export default totaux.reducer