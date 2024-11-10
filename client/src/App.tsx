import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import BGImage from '@/assets/bg.png';

function App() {
  const path = useLocation().pathname;
  return (
    <div
      style={{ backgroundImage: `url(${BGImage})` }}
      className=" bg-cover bg-center p-8 w-full min-h-screen h-full  flex items-center flex-col px-[6rem] "
    >
      <div className="w-full  text-center">
        <Link to="/">
          {' '}
          <h1 className="text-6xl py-4 font-bold">
            MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
          </h1>
        </Link>

        {path === '/' ? (
          <div className="max-h-[900px] h-[800px] flex items-center justify-center">
            <div className="flex w-full h-[450px] gap-[4rem] items-center justify-center ">
              <img
                className="w-[700px] object-cover h-full rounded-md block"
                src="https://cdn.prod.website-files.com/611c643a9a410952b2effdcc/612f2d0a41c629276903a472_photo_holygardens_matutum.jpg"
                alt="matutum"
              />
              <div className="w-[60%] text-start h-full flex justify-between flex-col gap-8">
                <h1 className="text-6xl  ">
                  RESERVE <br /> YOURS NOW!
                </h1>

                <div className=" w-full h-full  text-start p-4 rounded-md ">
                  <form className="flex text-start flex-col items-start justify-center h-full pr-[4rem]">
                    <Label className="my-2 text-xl font-thin">Full name</Label>
                    <Input
                      className="h-[3rem] border-2 rounded-full "
                      type="text"
                    />

                    <Label className="my-2 text-xl font-thin">
                      Email or Phone no.
                    </Label>
                    <Input
                      className="h-[3rem] border-2  rounded-full "
                      type="text"
                    />

                    <Button className="rounded-full self-end my-4 bg-white text-black h-[3rem] w-[10rem]">
                      Reserve{' '}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
        <div className="flex w-full justify-between my-4">
          <Link to="/map">Map</Link>

          <Link to="/support">SUPPORT</Link>

          <Link to="/contact">CONTACT US</Link>

          <Link to="/guidelines">GUIDELINES</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
