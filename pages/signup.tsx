import MaxWidth from '../components/layout/MaxWidth';
import Padding from '../components/layout/Padding';
import useForm from '../lib/useForm';
import { ChangeEventHandler, ChangeEvent } from 'react'
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Link from 'next/link';


const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;


export default function SignUpPage() {
    const { inputs, handleChange, resetForm } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs
    })

    async function handleSubmit(e: ChangeEvent) {
        e.preventDefault(); // stop the form from submitting
        const res = await signup().catch(console.error);
        resetForm();
        // Send the email and password to the graphqlAPI
    }
    return <div className='flex justify-center '>
        <MaxWidth>
            <Padding>
                <h1 className='font-headline text-3xl text-shadow-3d text-turquoise mb-4'>Sign Up</h1>
                {error && <div className='mb-4  p-4 border-yellow rounded-xl border-8 border-dashed'>
                    <h2 className='font-headline text-lg text-turquoise '>Error:</h2>
                    <p className='text-turquoise  font-body'>{error.message}</p>
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

                        <LabeledInput name='name' onChange={handleChange} value={inputs.name} label="Name" placeholder='Your Name' />

                        <LabeledInput name='email' onChange={handleChange} value={inputs.email} label="Email" placeholder='Your Email' />

                        <LabeledInput name='password' onChange={handleChange} value={inputs.password} label="Password" type="password" />

                        <Button type="submit">Submit</Button>
                    </fieldset>
                </form>}

            </Padding>
        </MaxWidth>


    </div>
}
