
import Heading from '../Utilities/Heading';
import Navigation from '../Navigation/Navigation';
import Security from './Security/Security';

function Settings({ navButtons }) {

    const title = "Settings"
    return (
        <div>
            <Navigation pathsWithButtons={navButtons} />
            <Heading title={title} />
            <Security />
        </div>
    );
}

export default Settings;