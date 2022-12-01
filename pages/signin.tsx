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
import nProgress from 'nprogress';



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


    const router = useRouter()
    const { query } = useRouter()
    const email = query.email
    const productQuery = query.product
    const [errorMessage, setErrorMessage] = useState()
    const { inputs, handleChange, resetForm } = useForm({
        email: email || '',
        password: '',
    });


    const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
        ],
        onCompleted: () => {
            resetForm();
            if (productQuery) {
                router.push(`/product/${productQuery}`)
            } else {
                router.push("/")
            }
        }
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault(); // stop the form from submitting
        try { signin() } catch (e) { console.log(e) }
    }
    useEffect(() => {
        console.log(data, loading, error)
    }, [data, loading, error])

    useEffect(() => {
        if (loading) {
            nProgress.start()
        } else if (data || error) {
            nProgress.done()
        }
    }, [error, loading, data])

    return <div className='mt-8 flex justify-center '>
        <MaxWidth>
            <Padding className="max-w-lg ">
                <h1 className='font-headline text-3xl text-shadow-3d text-turquoise mb-4'>Sign In</h1>
                {error && <div className='mb-4  p-4 border-yellow rounded-xl border-8 border-dashed'>
                    <h2 className='font-headline text-lg text-turquoise '>Error:</h2>
                    <p className='text-turquoise  font-body'>{error.message}</p>
                </div>}

                <form method="POST" onSubmit={handleSubmit} >
                    <fieldset className="flex flex-col gap-9" disabled={loading}>
                        <LabeledInput name='email' onChange={handleChange} value={inputs.email} label="Email" placeholder='Your Email' />
                        <LabeledInput name='password' onChange={handleChange} value={inputs.password} label="Password" type="password" />

                        <Button type="submit" disabled={loading}>Sign in</Button>
                    </fieldset>
                </form>

            </Padding>
        </MaxWidth>


    </div>
}
