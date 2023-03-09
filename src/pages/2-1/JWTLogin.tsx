import React, { useState } from 'react';
import { getCurrentUserInfoWithToken, loginWithToken } from '../../api/login';
import { UserInfo } from '../../types/user';

const JWTLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginPayload = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const loginResponse = await loginWithToken(loginPayload);
    if (loginResponse.result == 'fail') return null;
    const currentUserInfo = await getCurrentUserInfoWithToken(loginResponse.access_token);
    if (!currentUserInfo) return null;
    setUserInfo(currentUserInfo);
  };

  return (
    <div>
      <h1>Login with JWT - in memory</h1>
      <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit" value="Submit">
          submit
        </button>
      </form>
      <div>
        <h2>User info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default JWTLogin;
