
export const InitialState = {
    projects:[],
    project:{},
    snippet:{}
}

export const SnippetReducer =(state,action)=>{
    switch(action.type){
        default:{
            return{
                ...state
            }
        }
        case 'ADD - PROJECT':
            return{
                ...state,
                projects:[...action.payload]
            }
        case 'ADDGET - PROJECT':
            return{
                ...state,
                project:{...action.payload}
            }
        case 'ADD - SNIPPET':
            return{
                ...state,
                snippet:{...action.payload}
            }
    }
        
}