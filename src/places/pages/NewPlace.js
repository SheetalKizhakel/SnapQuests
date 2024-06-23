import React,{useCallback,useReducer} from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/components/util/validators';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button'
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
        };;
      default:
        return state;

    }
  };
const NewPlace = () => {

  //inputs stores validity of individual inouts like title,description etc
  //isValid checks overall form validity
  const [formState,dispatch]=useReducer(formReducer,//intital state which formreducer will update
    {
    inputs:{
      title:{value:'',
        isValid:false
      },
      description:{value:'',
        isValid:false
      },
    },
    isValid:false
  });
  //functions to check if the title entered is valid,the description entered is valid etc
  const inputHandler=useCallback((id,value,isValid)=>
    {
      dispatch({type:'INPUT_CHANGE',value:value,isValid:isValid,inputId:id})
    },[]);
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={formState.isValid==false}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
