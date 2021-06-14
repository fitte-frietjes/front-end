import api from '../../services/api';
import React from 'react';
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';

class ProfileView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileId: this.props.match.params.id,
            profile: [],
            account: []
        };
    }

    componentDidMount() {

        const { profileId } = this.state;

        // First get projects
        api.get(`/profile/${profileId}`)
            .then((response) => {
                this.setState({
                    profile: response.data,
                    account: response.data.account
                });
            }).catch((error) => {
                NotificationManager.error('Error encountered, click me to see error', 'Error!', 5000, () => {
                    alert(error);
                })
            })
    }

    render() {
        const { profile, account } = this.state;

        return (
            <div className="container profileView">
                <div className="info">
                    <table>
                        <tr>
                            <td>Naam</td>
                            <td>{account.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{account.email}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td><Moment format="DD-MM-YYYY">{profile.dateOfBirth}</Moment></td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>{profile.length} m</td>
                        </tr>

                        <tr>
                            <td>Weight</td>
                            <td>{profile.weight} kg</td>
                        </tr>
                        <tr>
                            <td>Desired weight</td>
                            <td>{profile.desiredWeight} kg</td>
                        </tr>
                        <tr>
                            <td>BMI</td>
                            <td>{profile.bmi}</td>
                        </tr>
                    </table>
                </div>
                <div className="steps">
                    <span>Total steps:</span>
                    <span className="step">88031</span>
                </div>
                
                <div className="snack">
                    <span>Favorite snack:</span>
                    <span className="name"> Bitterbal</span><br/>
                    <img src="/snack.jpg" alt="bitterbal" />
                </div>
            </div>

        )
    }

}
export default ProfileView
