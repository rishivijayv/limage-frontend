
import Heading from '../Utilities/Heading';
import Navigation from '../Navigation/Navigation';
import Security from './Security/Security';
import { NavButton } from '../GlobalTypes';

type SettingsProps = {
    navButtons: NavButton[]
};

function Settings({ navButtons }: SettingsProps) {

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