import { useAuthorizationCheck } from './HelperFunctions';
import { ProtectedComponentProps } from '../GlobalTypes';

type ProtectedProps = {
    Component: React.FC<ProtectedComponentProps>
};

function Protected({ Component }: ProtectedProps) {
   const user = useAuthorizationCheck();

   if(user === null){
        // We are in the process of checking if user is authorized
        return <h2>Loading...</h2>
   }

   return <Component user={user} />

}

export default Protected;