
import Heading from '../Utilities/Heading';
import Security from './Security/Security';

function Settings() {

    const title = "Settings"
    return (
        <div>
            <Heading title={title} />
            <Security />
        </div>
    );
}

export default Settings;