const { useMutation, gql } = require("@apollo/client")
import NavUrl from "./NavUrl"
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT = gql`
  mutation {
    endSession
  }
`;



const SignOut = () => {
    const [signOut] = useMutation(SIGN_OUT, { refetchQueries: [CURRENT_USER_QUERY] })
    return <NavUrl href="" onClick={signOut} >Sign Out</NavUrl>
}

export default SignOut