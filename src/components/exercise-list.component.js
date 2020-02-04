import React, {Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Redirect } from 'react-router-dom';

const Exerxise = props => (
    <tr>
        <td>{props.exercise.courseName}</td>
        <td>{props.exercise.Delivered}</td>
        <td>{props.exercise.Attended}</td>
        <td>{((props.exercise.Attended/props.exercise.Delivered)*100).toFixed(2)}%</td>
        <td>{props.exercise.MinPer}</td>
        <td>{((((props.exercise.MinPer*props.exercise.Delivered)-(100*props.exercise.Attended))/(100-props.exercise.MinPer)).toFixed(0))}</td>
        <td>
            <button><a href="/" onClick={() => {props.classAttended(props.exercise._id) }}>Attended</a></button>
            <button><a href="/" onClick={() => {props.classNotAttended(props.exercise._id) }}>Not Attended</a></button></td>
        <td>
            <button><a href="/" onClick={() => {props.deleteExercise(props.exercise._id) }}>Delete</a></button>
        </td>
    </tr>
)

export default class ExerciseList extends Component{
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.classAttended = this.classAttended.bind(this);
        this.classNotAttended = this.classNotAttended.bind(this);
        

        this.state = {
            courseName: '',
            Attended:0,
            Delivered:0,
            exercises: []};
    }
    fetchData = ()=>{
        axios.post('http://localhost:5000/exercise/',{email:sessionStorage.getItem("email")})
        .then(response => {
            console.log(response)
            this.setState({ exercises: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.fetchData();
    }

    deleteExercise(id) {
        const ans = window.confirm('Are You Sure ..?');
        if(ans){
        axios.delete('http://localhost:5000/exercise/'+id)
          .then(res => console.log(res.data));}
          this.setState({
              exercises: this.state.exercises.filter(el => el._id !== id)
          })
    }

    classAttended(id) {
            axios.post('http://localhost:5000/incAttendence',{
                id : id
            })
            .then(response => {
                this.fetchData() 
            })
    }
    classNotAttended(id) {
        axios.post('http://localhost:5000/decAttendence',{
                id : id
            })
            .then(response => {
                this.fetchData() 
            })
    }

    exerciseList() {
       
        return this.state.exercises.map(currentexercise => {
            //return <Exerxise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
            if((currentexercise.Attended/currentexercise.Delivered)*100 < currentexercise.MinPer)
            {return <tr>
            <td>{currentexercise.courseName}</td>
            <td>{currentexercise.Delivered}</td>
            <td>{currentexercise.Attended}</td>
            <td>{((currentexercise.Attended/currentexercise.Delivered)*100).toFixed(2)}%</td>
            <td>{currentexercise.MinPer}%</td>
            <td>{((((currentexercise.MinPer*currentexercise.Delivered)-(100*currentexercise.Attended))/(100-currentexercise.MinPer)+1).toFixed(0))} must be attended
            </td>
            <td>
                <button onClick={() => {this.classAttended(currentexercise._id) }}>Attended</button>
                <button onClick={() => {this.classNotAttended(currentexercise._id) }}>Not Attended</button>
                </td>
            <td>
                <button><a href="/" onClick={() => {this.deleteExercise(currentexercise._id) }}>Delete</a></button>
            </td>
        </tr>}
        else{
            return<tr>
            <td>{currentexercise.courseName}</td>
            <td>{currentexercise.Delivered}</td>
            <td>{currentexercise.Attended}</td>
            <td>{((currentexercise.Attended/currentexercise.Delivered)*100).toFixed(2)}%</td>
            <td>{currentexercise.MinPer}%</td>
            <td>{(((100*currentexercise.Attended)-(currentexercise.MinPer*currentexercise.Delivered))/currentexercise.MinPer).toFixed(0)} can be missed
            </td>
            <td>
                <button onClick={() => {this.classAttended(currentexercise._id) }}>Attended</button>
                <button onClick={() => {this.classNotAttended(currentexercise._id) }}>Not Attended</button>
                </td>
            <td>
                <button><a href="/" onClick={() => {this.deleteExercise(currentexercise._id) }}>Delete</a></button>
            </td>
        </tr>
        }
        })
    }

    render(){
        if(localStorage.token)
        return(
            
            <div>
                <h3>Courses.....</h3>    
                <table className="table" bgcolor='white'>
                    <thead className="thead-light">
                        <tr>
                            <th>Course Name</th>
                            <th>Lectures Delivered</th>
                            <th>Lectures Attended</th>
                            <th>Current Percentage (%)</th>
                            <th>Minimum Percentage</th>
                            <th>Lectures can be missed or to be attended</th>
                            <th>Today's Attendance</th>
                            <th>Other Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
        else 
        return <Redirect to='/users/login'/>
    }
}