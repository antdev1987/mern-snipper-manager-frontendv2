export const initialState = {
    user:{}
}


export const userReducer =(state,action)=>{
    switch(action.type){
        case 'LOGIN - USER':
            return {
                ...state,
                user:{...action.payload}
            }
        case 'EXIT - USER':
            return {
                ...state,
                user:{}
            }
        default:
            return{
                ...state
            }
    }
}