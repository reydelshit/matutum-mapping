import BGImage from '@/assets/bg.png';
import PlotHoveredContainer from '@/components/PlotHoveredContainer';
import SVGIMAGENEW from '@/components/SVGIMAGENEW';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { plots } from '@/data/Plots';
import axios from 'axios';
import { Ellipsis, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from 'react-zoom-pan-pinch';
import GraveModal from './GravesModal';
import usePagination from '@/hooks/usePagination';
import PaginationTemplate from '@/components/Pagination';
import moment from 'moment';
import { Link, Outlet, useLocation } from 'react-router-dom';

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

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState('');
  const [graves, setGraves] = useState<GraveItem[]>([]);
  const [searchPatay, setSearchPatay] = useState('');
  const [selectedPatay, setSelectedPatay] = useState('');

  const path = useLocation().pathname;
  const itemsPerPage = 10;

  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination({
      itemsPerPage: itemsPerPage,
      data: graves || [],
    });

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

  const handleAddPlot = (id: string) => {
    // console.log(id);
    setSelectedPlot(id);

    setShowModal(!showModal);
  };
  return (
    <div
      style={{ backgroundImage: `url(${BGImage})` }}
      className=" bg-cover bg-center p-8 w-full min-h-screen h-full  flex items-center flex-col px-[6rem] relative"
    >
      <div className="w-full  text-center ">
        <div className=" flex justify-between  h-[6rem] items-center w-full ">
          <h1 className="text-8xl font-bold">HELLO ADMIN!</h1>

          <span>NOV 8, 2024 GMT+8 10:30 AM</span>

          <span className="cursor-pointer">
            <Link to="/admin">Map</Link>
          </span>
          <span className="cursor-pointer">
            <Link to="/admin/reservations">RESERVATIONS</Link>
          </span>

          <span className="cursor-pointer">LOGOUT</span>
        </div>

        {path === '/admin' ? (
          <div className="flex gap-8 justify-between mt-[4rem]">
            <div className="relative w-[40%] grid place-content-center place-items-center  overflow-hidden bg-transparent">
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
                          onClick={() => handleAddPlot(`PLOT_${index + 1}`)}
                        />
                      ))}
                    </g>
                  </svg>
                </TransformComponent>
                <Controls />
              </TransformWrapper>
            </div>

            <div className="w-[50%] text-start flex flex-col">
              <Input
                onChange={(e) => {
                  setSearchPatay(e.target.value);

                  if (e.target.value === '') {
                    setSelectedPatay('');
                  }
                }}
                placeholder="Search patay"
                className="placeholder:text-white w-[70%] h-[3rem] border-2 rounded-full self-end"
              />

              {searchPatay && (
                <div className="w-[70%] h-fit border-2 rounded-md p-2 mt-2 self-end">
                  {graves
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
                        }}
                        className="cursor-pointer hover:text-yellow-300"
                        key={index}
                      >
                        {grave.fullname} - {grave.plot_no} -{' '}
                        {moment(grave.date_of_death).format('MMM Do YY')}
                      </h1>
                    ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <h1 className="text-2xl my-4">LIST OF GRAVES INSIDE OF PLOT</h1>

                <span>only shows {itemsPerPage} per page</span>
              </div>
              <Table>
                <TableCaption className="text-white">
                  A list of graves
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>Grave ID</TableCell>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Date of Death</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Plot No.</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((grave, index) => (
                    <TableRow
                      className="cursor-pointer"
                      onMouseEnter={() => setSelectedPatay(grave.plot_no)}
                      onMouseLeave={() => setSelectedPatay('')}
                      key={index}
                    >
                      <TableCell>{grave.grave_id}</TableCell>
                      <TableCell>{grave.fullname}</TableCell>
                      <TableCell>
                        {moment(grave.birthday).format('MMM Do YY')}
                      </TableCell>
                      <TableCell>
                        {moment(grave.date_of_death).format('MMM Do YY')}
                      </TableCell>
                      <TableCell>{grave.age}</TableCell>
                      <TableCell>{grave.plot_no}</TableCell>

                      <TableCell>
                        <Ellipsis className="h-4 w-4" color="white" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <PaginationTemplate
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      {showModal && (
        <GraveModal
          selectedPlot={selectedPlot}
          setShowModal={setShowModal}
          fetchGraves={fetchGraves}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
