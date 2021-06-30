import React, {useState} from "react";

const Form = (props) => {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const tName = name.trim();
    try{
      if(tName)
        props.onSubmit(tName);
      else
        throw new Error('Empty Task‽ wtf ):');
    }
    catch(e){
      alert(e);
    }
    setName('');
  }

  function handleChange(e){
    setName(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Wanna do wat???
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
