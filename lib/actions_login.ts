//Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.\\
//mark all the exported functions within the file as server functions\\
'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //clear this cache that stores the route segments in the user's browser and trigger a new request to the server\\
import { redirect } from 'next/navigation';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}