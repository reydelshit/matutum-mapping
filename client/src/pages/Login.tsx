import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  return (
    <div className="w-full min-h-screen h-full bg-green-700 flex items-center justify-center flex-col px-[6rem] ">
      <div className="w-full text-center flex border-2 justify-center">
        <h1 className="text-6xl text-wrap break-words w-[40%] text-start font-bold text-white">
          MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
        </h1>

        <div className="bg-white h-[300px] p-4 w-[450px] text-start rounded-2xl flex flex-col justify-center items-start">
          <Label>Username</Label>
          <Input className="mb-2" type="text" />

          <Label>Password</Label>
          <Input className="mb-2" type="password" />

          <Button className="self-center rounded-full">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
