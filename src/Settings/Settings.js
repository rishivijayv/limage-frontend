
import Heading from '../User/Utilities/Heading';
import Navigation from '../Navigation/Navigation';

function Settings({ navButtons }) {

    const title = "Settings"
    return (
        <div>
            <Navigation pathsWithButtons={navButtons} />
            <Heading title={title} />
        </div>
    );
}

export default Settings;