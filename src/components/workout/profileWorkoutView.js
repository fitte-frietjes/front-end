import api from '../../services/api';
import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ProfileWorkoutView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileId: this.props.match.params.id,
            workouts: [],
        };
    }

    loadProfileWorkouts() {
        const { profileId } = this.state;
        this.setState({
            workouts: [] // Clear all workouts
        });

        // First all workouts for profile
        api.get(`/workout/profileWorkout/profile/${profileId}`)
            .then((response) => {
                this.setState({
                    workouts: response.data,
                });
            }).catch((error) => {
                NotificationManager.error('Error encountered, click me to see error', 'Error!', 5000, () => {
                    alert(error);
                })
            })
    }

    componentDidMount() {
        this.loadProfileWorkouts();
    }




    deleteProfileWorkout(pw) {
        console.warn(pw);

        const handleClose = () => {
            console.log('Nah, dan toch niet');
        }

        const handleDelete = () => {
            api.delete('/workout/profileWorkout', pw)
                .then((response) => {
                    NotificationManager.success('Workout deleted', 'Success');
                    this.loadProfileWorkouts();
                }).catch((error) => {
                    NotificationManager.error('Error encountered, click me to see error', 'Error!', 5000, () => {
                        alert(error);
                    })
                })
        }

        confirmAlert({
            title: `Delete workout?`,
            message: `Are you sure you want to delete "${pw.workout.name}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete()
                },
                {
                    label: 'No',
                    onClick: () => handleClose()
                }
            ],
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
                            <th>Options</th>
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
                                        <td><span className="btnOption" onClick={() => { this.deleteProfileWorkout(item) }}>delete</span></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="options">
                    <Link to={`/workouts/add/${profileId}`}>
                        <span className="btnOption">Add new workout</span>
                    </Link>
                </div>
            </div>
        )
    }
}
export default ProfileWorkoutView