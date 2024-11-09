import { Contact2Icon, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="w-full min-h-screen h-full bg-green-700 flex items-center flex-col px-[6rem] ">
      <div className="w-full border-2 text-center">
        <h1 className="text-4xl py-4 font-semibold">
          MATUTUM MEMORIAL INTERACTIVE MAPPING SYSTEM
        </h1>

        <div className="h-[250px] flex items-start w-full flex-col justify-center border-2">
          <h1 className="text-start text-4xl my-2">Meet us</h1>

          <div className="flex justify-between w-full">
            <div className="flex items-center text-white gap-4">
              <Contact2Icon size={32} />
              <span>+639 4481 0842</span>
            </div>

            <div className="flex items-center text-white gap-4">
              <Mail size={32} />
              <span>JeraldAsuncion@gmail.com</span>
            </div>

            <div className="flex items-center text-white gap-4">
              <MapPin size={32} />
              <span>Polomolok, South Cotabato</span>
            </div>
          </div>
        </div>

        <img
          className="w-full object-cover h-[350px]"
          src="https://cdn.prod.website-files.com/611c643a9a410952b2effdcc/612f2d0a41c629276903a472_photo_holygardens_matutum.jpg"
          alt="matutum"
        />

        <div className="flex w-full justify-between mt-[4rem]">
          <Link to="/map">Map</Link>

          <Link to="/support">SUPPORT</Link>

          <Link to="/contact">CONTACT US</Link>

          <Link to="/guidelines">GUIDELINES</Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
