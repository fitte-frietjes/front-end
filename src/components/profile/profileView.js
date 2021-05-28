import api from '../../services/api';
import React from 'react';
import Moment from 'react-moment';

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
                console.warn(response.data);
            }).catch((error) => {
                console.warn(error);
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
                            <td>email</td>
                            <td>{account.email}</td>
                        </tr>
                        <tr>
                            <td>dateOfBirth</td>
                            <td><Moment format="DD-MM-YYYY">{profile.dateOfBirth}</Moment></td>
                        </tr>
                        <tr>
                            <td>length</td>
                            <td>{profile.length} m</td>
                        </tr>

                        <tr>
                            <td>weight</td>
                            <td>{profile.weight} kg</td>
                        </tr>
                        <tr>
                            <td>desiredWeight</td>
                            <td>{profile.desiredWeight} kg</td>
                        </tr>
                        <tr>
                            <td>bmi</td>
                            <td>{profile.bmi}</td>
                        </tr>
                    </table>
                </div>
            </div>

        )
    }

}
export default ProfileView
