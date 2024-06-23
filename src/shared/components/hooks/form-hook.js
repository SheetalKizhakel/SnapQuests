import {useCallback,useReducer} from 'react';
const formReducer=(state,action)=>
    {
      switch(action.type)
      {
        case 'INPUT_CHANGE':
          let formIsValid=true;
          for(const inputId in state.inputs)
            {
              if(inputId===action.inputId)//checking if the input im curretnly looking at is the same as the one getting updated in the curretn action
                {
                  formIsValid=formIsValid&&action.isValid;
                }
                else//if the action is not updating the current inout im looking at
                {
                  formIsValid=formIsValid&&state.inputs[inputId].isValid;//we take the already stored is valid state of the given inout id im looking at
                }
  
            }
          return{//new state after action hs been dispatched
            ...state,
            inputs:{
              ...state.inputs,//copy the already exisiting state
              [action.inputId]:{value:action.value,isValid:action.isValid}
            },
            isValid:formIsValid
          };
          case 'SET_DATA':
            return {
                inputs:action.inputs,
                isValid:action.formIsValid
            }
        default:
          return state;
  
      }
    };
export function useForm(initialInputs,initialFormValidity)
{
    const [formState,dispatch]=useReducer(formReducer,//intital state which formreducer will update
        {
        inputs:initialInputs,
        isValid:initialFormValidity
      });

    
    const inputHandler=useCallback((id,value,isValid)=>
        {
          dispatch({type:'INPUT_CHANGE',value:value,isValid:isValid,inputId:id})
        },[]);
    
    const setFormData=useCallback((inputData,formValidity)=>{
        dispatch({
            type:'SET_DATA',
            inputs:inputData,
            formIsValid:formValidity
        });
    },[]);
    return [formState,inputHandler,setFormData];
}