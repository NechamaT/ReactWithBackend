import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPersonForm from "./AddPersonForm";
import { produce } from "immer";
import axios from "axios";
import PersonRow from "./PeopleRow";


class PeopleTable extends React.Component {
  state = {
    people: [],
    person: {
      firstName: "",
      lastName: "",
      age: "",
      id: 0
    },
    edit: false,
    selectedPeople: []
  };

  componentDidMount = () => {
    axios.get("api/people/getall").then(({ data }) => {
      this.setState({ people: data });
    });
  };

  onTextChange = (e) => {
    const nextState = produce(this.state, (draftState) => {
      draftState.person[e.target.name] = e.target.value;
    });
    this.setState(nextState);
  };

  onAddClick = () => {
    axios.post('/api/people/add', this.state.person).then(() => {
      axios.get('/api/people/getall').then(({ data }) => {
        this.setState({
          people: data,
          person: { firstName: "", lastName: "", age: "" },
        });
      });
    });
  };

  onEditClick = (person) => {
    const nextState = produce(this.state, (draft) => {
      draft.person = person;
      draft.edit = true;
    });

    this.setState(nextState);
  };

  onDeleteClick = (person) => {
   axios.post('/api/people/delete', person).then(() => {
      axios.get('/api/people/getAll').then(({ data }) => {
       this.setState({
        people: data
        });
     });
   });
  };



  onCheck = (person) => {
    let selectedPpl = [];
    if(this.state.selectedPeople.includes(person)){
      selectedPpl= this.state.selectedPeople.filter(p => p !== person)
    }
    else{
      selectedPpl =[...this.state.selectedPeople, person]
    }
    this.setState({selectedPeople: selectedPpl})
    
  };


  selectAll = e =>{
    const {people} = this.state
    this.setState({selectedPeople: people})
  }
  deselectAll = e =>{
    this.setState({selectedPeople:[]})
  }
  onUpdateClick = () => {
    axios.post('/api/people/update', this.state.person).then(() => {
    axios.get('api/people/getAll').then(({data}) =>{
      this.setState({
        people: data,
        person: {firstName: "", lastName: "", age: ""},
        edit:false
      })
    });
  });
}

  delete = e =>{
    const { selectedPeople } = this.state;
    selectedPeople.forEach(person => {
      this.onDeleteClick(person)
    });
  }

  onCancelClick = () =>{
    this.setState({person: {firstName: '', lastName: '', age: ''}, edit: false})
  }

 
  render() {
    const { people, person, edit, selectedPeople } = this.state;
    const { firstName, lastName, age } = person;
    return (
      <div className="container" style={{ marginTop: 60 }}>

  <AddPersonForm
   person= {this.state.person}
   onTextChange={this.onTextChange}
   onAddClick={this.onAddClick}
   onCancelClick={this.onCancelClick}
   onUpdateClick={this.onUpdateClick}
   editMode={this.state.edit}
 />
        <div className="row">
        <div className="col-md-2">
          <button className="btn btn-outline-info" onClick={this.selectAll}>
            Select All
          </button>
          </div>
          <div className="col-md-2">
          <button className="btn btn-outline-info" onClick={this.deselectAll}>
            Deselect All
          </button>
          </div>
          <div className="col-md-2">
          <button className="btn btn-outline-info" onClick={this.delete}>
            Delete
          </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <table className="table table-header table-striped table-bordered">
              <thead>
                <tr>
                  <td>Select</td>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.people.map((person) => (
                  <PersonRow
                    onEditClick={() => this.onEditClick(person)}
                    onDeleteClick={() => this.onDeleteClick(person)}
                    onCheck={() => this.onCheck(person)}
                    isSelected={!this.state.selectedPeople.map( p => p.id).includes(person.id)}
                    person={person}
                    key={person.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PeopleTable;
