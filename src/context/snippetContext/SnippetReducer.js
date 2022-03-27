
export const InitialState = {
    projects:[],
    project:{}
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
                projects:state.projects.map(item =>{
                    console.log(item)
                    console.log(action.payload)
                   if(item.id === action.payload.idProject){

                    const newItem = {...item, snippets:[...item.snippets,{...action.payload.snippet}] }

                       return newItem
                   }

                   return item
                })
            }
    }
        
}