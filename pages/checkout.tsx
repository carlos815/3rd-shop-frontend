import MaxWidth from '../components/layout/MaxWidth';
import Padding from '../components/layout/Padding';
import useForm from '../lib/useForm';
import { ChangeEventHandler, ChangeEvent } from 'react'
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Buttons';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { ALL_PRODUCTS_QUERY } from '.';
import { CURRENT_USER_QUERY } from '../components/User';



// const USER_QUERY = gql`
//   query {
//     authenticatedItem {
//       ... on User {
//         id
//         email
//         name    
//       }
//     }
//   }
// `;

const SIGN_OUT = gql`
  mutation {
    endSession
  }
`;
export default function UserPage() {

  // const { inputs, handleChange, resetForm } = useForm({
  //     name: '',
  //     email: '',
  //     passsword: '',
  // });


  // const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
  //     variables: inputs
  // })


  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const [signOut] = useMutation(SIGN_OUT, { refetchQueries: [CURRENT_USER_QUERY] })

  async function handleSubmit(e: ChangeEvent) {
    console.log(data, loading, error)

    // e.preventDefault(); // stop the form from submitting
    // const res = await signup().catch(console.error);
    // console.log(res);
    // console.log({ data, loading, error });
    // resetForm();
    // Send the email and password to the graphqlAPI
  }
  return <div className='flex justify-center '>
    <MaxWidth>
      <Padding>
        <h1 className='font-headline text-3xl text-shadow-3d text-turquoise mb-4'>User Page</h1>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        <Button type="submit" onClick={signOut}>Sign out</Button>
      </Padding>
    </MaxWidth>


  </div>
}
