import React, {Component } from 'react';
import axios from 'axios';


export default class CreateExercises extends Component{
    constructor(props) {
        super(props);
        
        this.onChangeCoursename = this.onChangeCoursename.bind(this);
        this.onChangeDelivered = this.onChangeDelivered.bind(this);
        this.onChangeAttended = this.onChangeAttended.bind(this);
        this.onChangeMinPer = this.onChangeMinPer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            courseName: '',
            Attended: 0,
            Delivered: 0,
            MinPer: 0,
            courses: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                courses: response.data.map(course => course.courseName),
                courseName: response.data[0].courseName
            })
            }
        })
    }

    onChangeCoursename(e) {
        this.setState({
            courseName: e.target.value
        });
    }
    onChangeAttended(e) {
        this.setState({
            Attended: e.target.value
        });
    }
    onChangeDelivered(e) {
        this.setState({
            Delivered: e.target.value
        });
    }
    onChangeMinPer(e) {
        this.setState({
            MinPer: e.target.value
        });
    }
    
    
    onSubmit(e) {
        e.preventDefault();
        var e=sessionStorage.getItem("email");
        console.log(e);
        const exercise = {
            courseName: this.state.courseName,
            Delivered: this.state.Delivered,
            Attended: this.state.Attended,
            MinPer: this.state.MinPer,
            email : e
        }

        console.log(exercise)

       // if(exercise.Attended <= exercise.Delivered)
       // {
        axios.post('http://localhost:5000/exercise/add', exercise)
          .then(res => console.log(res.data));

        window.location = '/';
       // }
       // else{
        //    window.alert('Attended cannot be greater than Deivered');
       // }
    }

    render(){
        return(
        <div>
            <h3>Create New Course Here</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Course Name : </label>
                    <input type="text"
                    className="form-control"
                    value={this.setState.courseName}
                    onChange={this.onChangeCoursename}
                    /></div>
                 <div className="form-group">
                        <label>Lect Attended : </label>
                        <input type="number"
                        className="form-control"
                        value={this.setState.Attended}
                        onChange={this.onChangeAttended}
                     /></div>
                 <div className="form-group">
                            <label>Lect Delivered : </label>
                            <input type="number"
                            className="form-control"
                            value={this.setState.Delivered}
                            onChange={this.onChangeDelivered}
                     /></div>
                     <div className="form-group">
                            <label>Minimum Percentage : </label>
                            <input type="number"
                            className="form-control"
                            value={this.setState.MinPer}
                            onChange={this.onChangeMinPer}
                     /></div>
                     <div className="form-group">
                         <input type="submit" value="Create Course" className="btn btn-primary" />
                     </div>
            </form>
            </div>
        )
    }
}