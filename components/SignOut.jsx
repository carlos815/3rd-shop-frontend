const { useMutation, gql } = require("@apollo/client")
import { useNav } from "../lib/navStateProvider";
import NavUrl from "./NavUrl"
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT = gql`
  mutation {
    endSession
  }
`;



const SignOut = () => {
  const { closeSideMenu } = useNav()

  const [signOut] = useMutation(SIGN_OUT, {
    refetchQueries: [CURRENT_USER_QUERY], onCompleted:
      closeSideMenu
  },)


  return <NavUrl href="" onClick={signOut} >Sign Out</NavUrl>
}

export default SignOut