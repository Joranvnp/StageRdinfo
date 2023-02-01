import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import axios, { AxiosResponse} from "axios"

type users = {
    totalht : number,
    totaltva: number,
    totalttc: number,
} 

const initialState : any = {
    data: []
}

export const getUsers : any = createAsyncThunk('/api/user/list', async () => {

    let reponse : AxiosResponse = await axios.get('/api/user/list' )

    return reponse.data
})

export const users = createSlice ({
    name:'users',
    initialState,
    reducers:{},
    extraReducers :{
        [getUsers.fulfilled]: (state, action: PayloadAction<Array<users>>) => {
            state.data = action.payload
        },
    }
})


export default users.reducer