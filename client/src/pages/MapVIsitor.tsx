import PlotHoveredContainer from '@/components/PlotHoveredContainer';
import SVGIMAGENEW from '@/components/SVGIMAGENEW';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { plots } from '@/data/Plots';
import axios from 'axios';
import { Minus, Plus } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import BGImage from '@/assets/bg.png';

import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from 'react-zoom-pan-pinch';
import MainImage from '@/assets/main.png';
import { Label } from '@/components/ui/label';

interface GraveItem {
  grave_id: number;
  fullname: string;
  birthday: string;
  date_of_death: string;
  age: number;
  created_at: string;
  plot_no: string;
}

const Controls = () => {
  const { zoomIn, zoomOut } = useControls();
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => zoomIn()}
        className="bg-white/90 hover:bg-white shadow-md text-black"
      >
        <Plus className="h-4 w-4" color="black" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => zoomOut()}
        className="bg-white/90 hover:bg-white shadow-md text-black"
      >
        <Minus className="h-4 w-4 " color="black" />
        <span className="sr-only">Zoom out</span>
      </Button>
    </div>
  );
};

const MapVIsitor = () => {
  const [selectedPatay, setSelectedPatay] = useState('');
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [searchPatay, setSearchPatay] = useState('');
  const [graves, setGraves] = useState<GraveItem[]>([]);
  const [selectedPatayDetails, setSelectedPatayDetails] = useState<GraveItem>(
    {} as GraveItem,
  );
  const [selectedPlot, setSelectedPlot] = useState('');

  const [reservationData, setReservationData] = useState({
    fullname: '',
    contact_information: '',
    plot_no: '',
    plot_type: '',
    date: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGraves = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave`,
      );

      console.log(res.data, 'selected graves');

      setGraves(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGraves();
  }, []);

  return (
    <div className="w-full text-center h-[800px] relative">
      <div className="flex gap-8 justify-between mt-[4rem]">
        <div className="w-[50%] text-start flex flex-col">
          <div className="w-[70%]">
            <h1>Search Loved Ones</h1>
            <Input
              onChange={(e) => {
                setSearchPatay(e.target.value);

                if (e.target.value === '') {
                  setSelectedPatay('');
                }
              }}
              placeholder="Search patay"
              className="placeholder:text-white w-full h-[3rem] border-2 rounded-full self-end"
            />

            {searchPatay && (
              <div className="w-full h-fit border-2 rounded-md p-2 mt-2 self-end">
                {graves.filter((grave) =>
                  grave.fullname
                    .toLowerCase()
                    .includes(searchPatay.toLowerCase()),
                ).length > 0 ? (
                  graves
                    .filter((grave) =>
                      grave.fullname
                        .toLowerCase()
                        .includes(searchPatay.toLowerCase()),
                    )
                    .map((grave, index) => (
                      <h1
                        onClick={() => {
                          console.log(grave.plot_no);
                          setSelectedPatay(grave.plot_no);
                          setSelectedPatayDetails(grave);
                          setSearchPatay('');
                        }}
                        className="cursor-pointer hover:text-yellow-300"
                        key={index}
                      >
                        {grave.fullname} - {grave.plot_no} -{' '}
                        {moment(grave.date_of_death).format('MMM Do YY')}
                      </h1>
                    ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            )}

            {selectedPatay.length > 0 ? (
              <div className="mt-[4rem]">
                <span>OCCUPANT NAME</span>

                <h1 className="bg-[#FFF6F2] p-2 rounded-md text-black font-thin h-[4rem] text-center my-auto text-4xl">
                  {selectedPatayDetails.fullname}
                </h1>

                <div className="mt-[2rem]">
                  <h2 className="text-xl">{selectedPatayDetails.fullname}</h2>
                  <p className="italic text-4xl font-bold my-4">
                    {moment(selectedPatayDetails.birthday).format('YYYY')} -{' '}
                    {moment(selectedPatayDetails.date_of_death).format('YYYY')}
                  </p>

                  <h1 className="text-4xl font-thin my-4 flex gap-2">
                    <span className="bg-yellow-500 h-[3rem] w-[3rem] rounded-md block text-yellow-500">
                      s
                    </span>{' '}
                    {selectedPatayDetails.plot_no}
                  </h1>
                </div>
              </div>
            ) : (
              <div className="mt-[4rem]">
                <img
                  className="w-[800px] object-cover h-[200px] rounded-md block"
                  src={MainImage}
                  alt="matutum"
                />

                <h1 className="italic text-4xl font-bold my-4">
                  RESERVE YOUR PLOT NOW
                </h1>
                <p>Click on a plot in the map to reserve.</p>

                <div>
                  <h1 className="text-4xl font-thin my-4 flex gap-2">
                    <span className="bg-yellow-500 h-[3rem] w-[3rem] rounded-md block text-yellow-500">
                      s
                    </span>{' '}
                    SELECTED OCCUPANT
                  </h1>

                  <h1 className="text-4xl font-thin my-4 flex gap-2">
                    <span className="bg-green-500 h-[3rem] w-[3rem] rounded-md block text-green-500">
                      s
                    </span>{' '}
                    PARTIALLY OCCUPIED
                  </h1>

                  <h1 className="text-4xl font-thin my-4 flex gap-2">
                    <span className="bg-red-500 h-[3rem] w-[3rem] rounded-md block text-red-500">
                      s
                    </span>{' '}
                    FULL / UNAVAILABLE
                  </h1>

                  <h1 className="text-4xl font-thin my-4 flex gap-2">
                    <span className="bg-black h-[3rem] w-[3rem] rounded-md block text-black">
                      s
                    </span>{' '}
                    EMPTY
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative w-[60%] grid place-content-start place-items-center overflow-hidden bg-transparent">
          <TransformWrapper initialScale={1} minScale={0.5} maxScale={4}>
            <TransformComponent
              wrapperClass="w-fit h-fit"
              contentClass="w-fit h-fit"
            >
              <svg
                className="rotate-[270deg]"
                width="297mm"
                height="210mm"
                viewBox="0 0 1122.5197 793.70081"
                version="1.1"
                id="svg1"
                xmlSpace="preserve"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs id="defs1" />
                <g id="layer1">
                  <SVGIMAGENEW />

                  {plots.map((plot, index) => (
                    <PlotHoveredContainer
                      selectedPatay={selectedPatay}
                      key={index}
                      id={`PLOT_${index + 1}`}
                      d={plot.d}
                      onClick={() => {
                        setShowReserveModal(true);
                        setSelectedPlot(`PLOT_${index + 1}`);
                      }}
                    />
                  ))}
                </g>
              </svg>
            </TransformComponent>
            <Controls />
          </TransformWrapper>
        </div>
      </div>

      {showReserveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div
            className="w-[40%] h-[40%] bg-white text-[#fff6f2] rounded-2xl p-4 shadow-lg"
            style={{ backgroundImage: `url(${BGImage})` }}
          >
            {/* Modal content */}
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reserve Plot</h2>

                <Button onClick={() => setShowReserveModal(false)}>
                  Close
                </Button>
              </div>
              <div className="flex-1 text-start justify-center h-full items-start flex flex-col w-full">
                <h1 className="text-3xl">SELECTED PLOT: {selectedPlot}</h1>

                <form className="mt-2 w-full">
                  <Input
                    className="h-[3rem] rounded-full placeholder:text-white "
                    placeholder="Fullname"
                    type="text"
                    name="fullname"
                    onChange={handleInput}
                    value={reservationData.fullname}
                  />

                  <Input
                    className="h-[3rem] rounded-full mt-2 placeholder:text-white "
                    placeholder="Phone or Email"
                    type="text"
                    name="contact_info"
                    onChange={handleInput}
                    value={reservationData.contact_information}
                  />

                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    className="h-[3rem] rounded-full"
                    type="date"
                    id="date"
                    name="date"
                    value={reservationData.date}
                    onChange={handleInput}
                    required
                  />

                  <div className="flex justify-end w-full">
                    <Button
                      className="bg-white text-black h-[3rem] w-fit rounded-full my-4"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapVIsitor;
