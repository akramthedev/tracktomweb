import { createSlice } from '@reduxjs/toolkit'

const initState = {
    MenuState:false
}

const SliceMenu=createSlice({
    name:'menu',
    initialState:initState,
    reducers:{
        HideMenu:(state,action)=>{
                state.MenuState = action.payload; 
        },
    }
})


export const {HideMenu } = SliceMenu.actions
export default SliceMenu.reducer