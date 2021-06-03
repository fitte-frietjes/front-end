import api from '../../services/api';
import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';

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
                NotificationManager.success('Workout added to profile ', 'Success');
                this.props.history.push(`/workouts/${profileId}`) // GOTO page!
            }).catch((error) => {
                NotificationManager.error('Error encountered, click me to see error', 'Error!', 5000, () => {
                    alert(error);
                })
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
                    <table>
                        <tr>
                            <td>Workout</td>
                            <td>
                                <select name="workout" onChange={this.handleChange.bind(this)}>
                                    {
                                        workouts && workouts.map(item => {
                                            return (<option key={item.id} value={item.id}>{item.name}</option>)
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Duration (min)</td>
                            <td>
                                <input type="number" name="duration" onChange={this.handleChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Submit" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div >
        )
    }
}
export default ProfileWorkoutAdd