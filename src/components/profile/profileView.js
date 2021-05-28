import api from '../../services/api';
import React from 'react';

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
            <div className="profileView">
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
                            <td>{profile.dateOfBirth}</td>
                        </tr>

                        <tr>
                            <td>length</td>
                            <td>{profile.length}</td>
                        </tr>

                        <tr>
                            <td>weight</td>
                            <td>{profile.weight}</td>
                        </tr>
                        <tr>
                            <td>desiredWeight</td>
                            <td>
                                <Moment>{profile.desiredWeight}</Moment>
                            </td>
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
