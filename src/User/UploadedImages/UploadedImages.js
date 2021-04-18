import { Link, useParams, useRouteMatch } from 'react-router-dom';

function UploadedImages(){
    const { username } = useParams();
    const match = useRouteMatch();

    return (
        <div>
            <ul>
                <li>
                    Image 1
                </li>
                <li>
                    Image 2
                </li>
            </ul>    
        </div>
    );
}

export default UploadedImages;