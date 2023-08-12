import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import loginStylesUrl from '../styles/login.css';
import { login, register } from "~/utils/auth.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession } from "~/utils/session.server";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: loginStylesUrl },
];

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const loginType = form.get('loginType');
  const username = form.get('username');
  const password = form.get('password');
  const redirectTo = (form.get('redirectTo') as string) || '/';

  if (
    typeof loginType !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Form not properly submitted!',
    });
  }

  const fields = { username, password, loginType };

  console.log('loginType', loginType);
  console.log('username', username);
  console.log('password', password);

  if (loginType === 'login') {
    const user = await login({ username, password });
    console.log('user', user);
    if (!user) {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: 'Username/Password combination is incorrect',
      });
    }
    return createUserSession(user.id, redirectTo);
  }

  if (loginType === 'register') {
    const user = await register({ username, password });
    if (!user) {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: 'Username already exists!',
      });
    }
    return createUserSession(user.id, redirectTo);
  }
  // Should not get here
  return badRequest({
    fieldErrors: null,
    fields,
    formError: 'Invalid login type',
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className='container'>
      <div className='content'>
        <h1>Login</h1>
        <Form method='post'>
          <fieldset>
            <legend className='sr-only'>
              Login or Register?
            </legend>
            <label>
              <input 
                type='radio' 
                name='loginType' 
                value='login' 
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === 'login'
                }
              />{' '}
              Login
            </label>
            <label>
              <input 
                type='radio' 
                name='loginType' 
                value='register' 
                defaultChecked={actionData?.fields?.loginType === 'register'}
              />{' '}
              Register
            </label>
          </fieldset>
          <div>
            <label htmlFor='username'>Username</label>
            <input 
              type='text'
              id='username'
              name='username'
              defaultValue={actionData?.fields?.username ?? ''}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input 
              type='password'
              id='password'
              name='password'
              defaultValue={actionData?.fields?.password ?? ''}
            />
          </div>
          <button className='primary' type='submit'>Submit</button>
        </Form>
      </div>
    </div>
  );
}