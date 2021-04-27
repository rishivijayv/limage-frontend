import Navigation from '../Navigation/Navigation';

function Discover({ navButtons }){
    return (
        <div>
            <Navigation pathsWithButtons={navButtons} />
            <h1>
                Discover new things here
            </h1>
        </div>
    );
}

export default Discover;