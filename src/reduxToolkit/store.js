import {configureStore} from  '@reduxjs/toolkit'
import SliceMenu from './sliceMenu';


const Store = configureStore({
    reducer:{ 
        menu:SliceMenu
    }
})


export default Store;