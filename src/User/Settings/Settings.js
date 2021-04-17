import { useParams } from 'react-router-dom';

function Settings() {
    const { username } = useParams();

    return <h1> Settings for {username} </h1>;
}

export default Settings;