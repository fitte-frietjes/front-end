import api from '../../services/api';
import React from 'react';
import { NavLink as Link } from 'react-router-dom'

class ProfileWorkoutAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileId: this.props.match.params.id,
            workouts: [],
            workout: '',
            duration: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // GET all workouts
        api.get('/workout')
            .then((response) => {
                this.setState({
                    workouts: response.data,
                });
            }).catch((error) => {
                console.warn(error);
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        const { workout, duration, profileId } = this.state;
        
        // Submit
        let body = {
            "id": "",
            "profileId": profileId,
            "workoutId": workout,
            "duration": duration
        }

        // Post, on success redirect page back
        api.post('/workout/profileWorkout', body)
            .then((resp) => {
                console.log(resp);
                //
            }).catch((resp) => {
                console.warn(resp)
            });     
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        if (name === "workout") {
            this.setState({ workout: value });
        } else if (name === "duration") {
            this.setState({ duration: value });
        }
    }

    render() {
        const { workouts } = this.state;
        return (
            <div className="container workoutAddView">
                <form onSubmit={this.handleSubmit}>
                    <select name="workout" onChange={this.handleChange.bind(this)}>
                        {
                            workouts && workouts.map(item => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>)
                            })
                        }
                    </select>
                    <input type="number" name="duration" onChange={this.handleChange.bind(this)} />
                    <input type="submit" value="Submit" />
                </form>
            </div >
        )
    }
}
export default ProfileWorkoutAdd