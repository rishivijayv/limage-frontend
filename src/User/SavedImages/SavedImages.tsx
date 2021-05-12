import { useParams } from 'react-router-dom';

type RouteParams = {
    labelName: string
}

function SavedImages(){
    const { labelName } = useParams<RouteParams>();

    return (
        <div>
            <h1> Images Saved for {labelName} </h1>
            <ul>
                <li> Image 1</li>
                <li> Image 2</li>
            </ul>
        </div>
    );
}

export default SavedImages;