import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BGImage from '@/assets/bg.png';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameFromEnv = import.meta.env.VITE_USERNAME;
  const passwordFromEnv = import.meta.env.VITE_PASSWORD;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('isLoginMatutumMapping', 'true');

    if (username === usernameFromEnv && password === passwordFromEnv) {
      console.log('login success');

      window.location.href = '/admin';
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${BGImage})` }}
      className=" bg-cover bg-center p-8 w-full min-h-screen h-full flex items-center justify-center flex-col px-[6rem] "
    >
      <div className="w-full text-center flex  justify-center items-center gap-[5rem]">
        <h1 className="text-6xl text-wrap break-words w-[40%] text-start font-bold text-white">
          MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
        </h1>
        <div className=" w-[40%] h-full  text-start rounded-md ">
          <form
            onSubmit={handleLogin}
            className="flex text-start flex-col items-start justify-center h-full pr-[4rem]"
          >
            <Label className="my-2 text-xl font-thin">Username</Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className="h-[3rem] border-2 rounded-full "
              type="text"
            />

            <Label className="my-2 text-xl font-thin">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="h-[3rem] border-2  rounded-full "
              type="password"
            />

            <Button
              type="submit"
              className="rounded-full self-end my-4 bg-white text-black h-[3rem] w-[10rem]"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
