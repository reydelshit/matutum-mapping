import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import BGImage from '@/assets/bg.png';
import MainImage from '@/assets/main.png';

function App() {
  const path = useLocation().pathname;
  return (
    <div
      style={{ backgroundImage: `url(${BGImage})` }}
      className=" bg-cover bg-center p-8 w-full min-h-screen h-full  flex items-center flex-col px-[6rem] relative"
    >
      <div className="w-full text-center relative">
        <Link to="/">
          {' '}
          <h1 className="text-6xl py-2 font-bold">
            MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
          </h1>
        </Link>

        {path === '/' ? (
          <div className="max-h-[900px] h-[800px] flex items-center justify-center relative">
            <div className="flex w-full h-[450px] gap-[4rem] items-center justify-center ">
              <img
                className="w-[800px] object-cover h-full rounded-md block"
                src={MainImage}
                alt="matutum"
              />
              <div className="w-[60%] text-start h-full flex justify-center flex-col gap-8">
                <h1 className="text-6xl  ">
                  RESERVE <br /> YOURS NOW!
                </h1>

                <p>
                  The Matutum Memorial Interactive Mapping System is a digital
                  map designed to help visitors find grave sites easily within
                  Matutum Memorial Park. Users can search by name to locate
                  specific plots, see highlighted locations on the map, and view
                  details about each plot. This system provides a simple,
                  respectful way for visitors to navigate the park.
                </p>

                <Link to="/map-visitor">
                  <Button className="rounded-full my-4 bg-white text-black h-[5rem] text-2xl w-[15rem]">
                    Reserve{' '}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
        <div className="flex w-full justify-between my-4 mt-[2rem]">
          <Link to="/map-visitor">Map</Link>

          <Link to="/support">SUPPORT</Link>

          <Link to="/contact">CONTACT US</Link>

          <Link to="/guidelines">GUIDELINES</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
