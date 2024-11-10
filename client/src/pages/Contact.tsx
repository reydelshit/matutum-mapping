import { Contact2Icon, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="w-full  text-center h-[800px]">
      <div className="h-[250px] flex items-start w-full flex-col justify-center">
        <h1 className="text-start text-6xl my-4">Meet us</h1>

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
        className="w-full object-cover h-[450px] rounded-md"
        src="https://cdn.prod.website-files.com/611c643a9a410952b2effdcc/612f2d0a41c629276903a472_photo_holygardens_matutum.jpg"
        alt="matutum"
      />
    </div>
  );
};

export default Contact;
