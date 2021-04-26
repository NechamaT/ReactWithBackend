import React from "react";

export default function AddPersonForm({
  person,
  onTextChange,
  onAddClick, 
  editMode,
  onUpdateClick,
  onCancelClick})
{
const{firstName, lastName, age} = person;
 
  return (
    <div className="row jumbotron">
      <div className="col-md-3">
        <input
          type="text"
          value={firstName}
          name="firstName"
          placeholder="First Name"
          className="form-control"
          onChange={onTextChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          value={lastName}
          name="lastName"
          placeholder="Last Name"
          className="form-control"
          onChange={onTextChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          value={age}
          name="age"
          placeholder="Age"
          className="form-control"
          onChange={onTextChange}
        />
      </div>
      <div className="col-md-3">
       {!editMode &&  <button onClick={onAddClick} className="btn btn-outline-info">
          Add
        </button>}

        {editMode && <div><button onClick={onUpdateClick} className="btn btn-outline-info"> Update</button>
          <button  style={{marginLeft:20}} onClick={onCancelClick} className="btn btn-outline-info"> Cancel</button></div>}
        
        </div>
      </div>

  );
}
