import {configureStore, combineReducers} from "@reduxjs/toolkit"
import tiersReducer from "./Reducers/tiers"
import userReducer from "./Reducers/user"
import devisReducer from "./Reducers/devis"
import factureReducer from "./Reducers/facture"
import ligneReducer from "./Reducers/ligne"
import totauxReducer from "./Reducers/totaux"

const reducers = combineReducers({
    tiers: tiersReducer,
    users: userReducer,
    devis: devisReducer,
    facture: factureReducer,
    ligne: ligneReducer,
    totaux: totauxReducer
})

const store = configureStore({
    reducer: reducers
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch