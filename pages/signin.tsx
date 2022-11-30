// @ts-nocheck
import MaxWidth from '../components/layout/MaxWidth';
import Padding from '../components/layout/Padding';
import useForm from '../lib/useForm';
import { ChangeEventHandler, ChangeEvent, useEffect } from 'react'
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Buttons';
import gql from 'graphql-tag';
import { useMutation, } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY, useUser } from '../components/User';
import { useState, FormEvent } from 'react'



const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignInPage() {

    const [errorMessage, setErrorMessage] = useState()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });


    const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
        ],
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault(); // stop the form from submitting
        const res = await signin().catch(console.error);
        if (res?.data.authenticateUserWithPassword.__typename == "UserAuthenticationWithPasswordFailure") {
            setErrorMessage(res?.data.authenticateUserWithPassword.message)
            return
        }
        resetForm();
        router.push("/")
    }
    const router = useRouter()


    return <div className='mt-8 flex justify-center '>
        <MaxWidth>
            <Padding className="max-w-lg ">
                <h1 className='font-headline text-3xl text-shadow-3d text-turquoise mb-4'>Sign In</h1>
                {errorMessage && <div className='mb-4  p-4 border-yellow rounded-xl border-8 border-dashed'>
                    <h2 className='font-headline text-lg text-turquoise '>Error:</h2>
                    <p className='text-turquoise  font-body'>{errorMessage}</p>
                </div>
                }
                {data?.createUser ? (
                    <>
                        <h2 className='font-headline text-lg text-turquoise '>Success!</h2>
                        <p className='text-turquoise  font-body'>Signed up with {data.createUser.email}</p>
                        <Link href={"/signin"}>
                            <Button>Sign In</Button>
                        </Link>
                    </>
                ) : <form method="POST" onSubmit={handleSubmit} >


                    <fieldset className="flex flex-col gap-9" disabled={loading}>

                        <LabeledInput name='email' onChange={handleChange} value={inputs.email} label="Email" placeholder='Your Email' />

                        <LabeledInput name='password' onChange={handleChange} value={inputs.password} label="Password" type="password" />

                        <Button type="submit">Sign in</Button>
                    </fieldset>
                </form>}

            </Padding>
        </MaxWidth>


    </div>
}
