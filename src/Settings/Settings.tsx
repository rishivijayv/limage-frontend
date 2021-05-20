
import Heading from '../Utilities/Heading';
import Security from './Security/Security';
import Navigation from '../Navigation/Navigation';
import { ProtectedComponentProps } from '../GlobalTypes';

function Settings({ user }: ProtectedComponentProps) {

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