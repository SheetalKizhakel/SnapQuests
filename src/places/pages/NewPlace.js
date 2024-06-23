import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/components/util/validators';
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/components/hooks/form-hook';
const NewPlace = () => {
  const [formState,inputHandler]=useForm({
    title:{
      value:'',
      isValid:false
    },
    description:{
      value:'',
      isValid:false
    },
    address:{
      value:'',
      isValid:false
    }
  },false
  );
  //inputs stores validity of individual inouts like title,description etc
  //isValid checks overall form validity
  
  //handling the adding new place submission
  function placeSubmitHandler(event)
  {
    event.preventDefault();
    //here we would wanna send the details to the backend
    console.log(formState.inputs);
  }
  //functions to check if the title entered is valid,the description entered is valid etc
  
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={formState.isValid==false}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
