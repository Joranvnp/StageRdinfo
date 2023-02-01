import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios, { AxiosResponse} from "axios"

type tiers = {
    totalht : number,
    totaltva: number,
    totalttc: number,
} 

const initialState : any = {
    data: []
}

export const getTiers : any = createAsyncThunk('/api/tiers/listetiers', async () => {

    let reponse : AxiosResponse = await axios.get('/api/tiers/listetiers' )

    return reponse.data
})

export const tiers = createSlice ({
    name:'tiers',
    initialState,
    reducers:{},
    extraReducers :{
        [getTiers.fulfilled]: (state, action: PayloadAction<Array<tiers>>) => {
            state.data = action.payload
        },
    }
})


export default tiers.reducer