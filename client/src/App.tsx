import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

function App() {
  return (
    <div className="w-full min-h-screen h-full bg-green-700 flex items-center flex-col px-[6rem] ">
      <div className="w-full border-2  text-center">
        <h1 className="text-4xl py-4 font-semibold">
          MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
        </h1>

        <div className="max-h-[900px] h-[650px] flex items-center">
          <div className="flex w-full h-[400px] gap-[4rem] border-2">
            <img
              className="w-[600px] object-cover h-full"
              src="https://cdn.prod.website-files.com/611c643a9a410952b2effdcc/612f2d0a41c629276903a472_photo_holygardens_matutum.jpg"
              alt="matutum"
            />
            <div className="w-full text-start h-full flex justify-between  flex-col gap-8">
              <h1 className="text-6xl  border-2">
                RESERVE <br /> YOURS NOW!
              </h1>

              <div className="bg-white w-full h-full text-start p-4 rounded-md border-2 border-orange-500">
                <form>
                  <Label>Full name</Label>
                  <Input type="text" placeholder="Enter your full name" />

                  <Label>Email or Phone no.</Label>
                  <Input type="text" placeholder="email or phone no." />

                  <Button className="rounded-full my-4">Reserve </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

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
