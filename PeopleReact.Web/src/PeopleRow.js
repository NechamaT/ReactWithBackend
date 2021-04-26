import React from "react";

export default function PersonRow({ person,  onEditClick, onDeleteClick, isSelected, onCheck}) {

  const{firstName, lastName, age} = person

  return (
    <tr>
      <td>
        <div className="form-check">
          <input
            type="checkbox"
            checked={!isSelected}
            onChange={onCheck}
            className="form-check-input"
          />
        </div>
      </td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{age}</td>
      <td>
        <button className="btn btn-warning" onClick={onEditClick}>
          Edit
        </button>
        <button
          style={{marginLeft:20}}
          className="btn btn-danger"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
