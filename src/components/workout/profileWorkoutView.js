import api from '../../services/api';
import React from 'react';
import { NavLink as Link } from 'react-router-dom'

class ProfileWorkoutView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileId: this.props.match.params.id,
            workouts: [],
        };
    }

    componentDidMount() {

        const { profileId } = this.state;

        // First all workouts for profile
        api.get(`/workout/profileWorkout/profile/${profileId}`)
            .then((response) => {
                this.setState({
                    workouts: response.data,
                });
            }).catch((error) => {
                console.warn(error);
            })
    }

    render() {
        const { workouts, profileId } = this.state;

        return (
            <div className="container workoutView">
                <div className="profileWorkouts">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Level</th>
                            <th>Category</th>
                            <th>Duration (min)</th>
                        </tr>
                        {
                            workouts && workouts.map(item => {
                                return (
                                    <tr>
                                        <td>{item.workout.name}</td>
                                        <td>{item.workout.type}</td>
                                        <td>{item.workout.level}</td>
                                        <td>{item.workout.category}</td>
                                        <td>{(item.duration / 60).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="options">
                    <Link to={`/workouts/add/${profileId}`}>
                        <span>Add new workout</span>
                    </Link>
                </div>
            </div>
        )
    }
}
export default ProfileWorkoutView