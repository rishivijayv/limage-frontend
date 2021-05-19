
import Heading from '../Utilities/Heading';
import Security from './Security/Security';
import Navigation from '../Navigation/Navigation';

function Settings() {

    const title = "Settings"
    return (
        <div>
            <Navigation />
            <Heading title={title} />
            <Security />
        </div>
    );
}

export default Settings;