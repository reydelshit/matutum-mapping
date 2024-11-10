import BGImage from '@/assets/bg.png';
import PaginationTemplate from '@/components/Pagination';
import PlotHoveredContainer from '@/components/PlotHoveredContainer';
import SVGIMAGENEW from '@/components/SVGIMAGENEW';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { plots } from '@/data/Plots';
import { toast } from '@/hooks/use-toast';
import usePagination from '@/hooks/usePagination';
import axios from 'axios';
import { Ellipsis, Minus, Plus } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from 'react-zoom-pan-pinch';
import GraveModal from './GravesModal';

interface GraveItem {
  grave_id: number;
  fullname: string;
  birthday: string;
  date_of_death: string;
  age: number;
  created_at: string;
  plot_no: string;
}

interface GraveDataInput {
  grave_id?: number;
  fullname: string;
  birthday: string;
  date_of_death: string;
  age?: number;
  created_at?: string;
  plot_no?: string;
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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGraveID, setUpdateGraveID] = useState(0);

  const [graveData, setGraveData] = useState({} as GraveDataInput);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGraveData({
      ...graveData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleDeleteGrave = async (id: number) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/delete/${id}`,
      );

      console.log(res.data);

      toast({
        title: 'Success',
        description: 'Grave deleted successfully',
      });

      fetchGraves();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateModal = async (id: number) => {
    setUpdateGraveID(id);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/speci/${id}`,
      );

      console.log(res.data, 'specific grave');

      if (res.data) {
        setGraveData({
          fullname: res.data.fullname,
          age: res.data.age,
          birthday: res.data.birthday,
          date_of_death: res.data.date_of_death,
          plot_no: res.data.plot_no,
        });
      }
    } catch (e) {
      console.log(e);
    }

    setShowUpdateModal(!showUpdateModal);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/update/${updateGraveID}`,
        {
          ...graveData,
          plot_no: graveData.plot_no,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.data.status === 'success') {
        toast({
          title: 'Success',
          description: 'Grave updated successfully',
        });

        setShowUpdateModal(false);
        fetchGraves();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${BGImage})` }}
      className=" bg-cover bg-center p-8 w-full min-h-screen h-full  flex items-center flex-col px-[6rem] relative"
    >
      <div className="w-full  text-center ">
        <div className=" flex justify-between  h-[6rem] items-center w-full ">
          <h1 className="text-6xl font-bold">HELLO ADMIN!</h1>

          <span>NOV 8, 2024 GMT+8 10:30 AM</span>

          <span className="cursor-pointer">
            <Link to="/admin">Map</Link>
          </span>
          <span className="cursor-pointer">
            <Link to="/admin/reservations">RESERVATIONS</Link>
          </span>

          <span
            className="cursor-pointer"
            onClick={() => {
              localStorage.removeItem('isLoginMatutumMapping');
              window.location.href = '/';
            }}
          >
            LOGOUT
          </span>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Ellipsis className="h-4 w-4" color="white" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleUpdateModal(grave.grave_id)}
                            >
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteGrave(grave.grave_id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-black">
          <div
            className="w-[40%] max-w-6xl mx-auto  border-none text-white p-4 rounded-md"
            style={{ backgroundImage: `url(${BGImage})` }}
          >
            <h1 className="text-2xl my-4">UPDATE GRAVE DETAILS</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 placeholder:text-white h-[3rem]"
                  value={graveData.fullname}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter full name"
                  name="fullname"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-white">
                  Age
                </Label>
                <Input
                  id="age"
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 placeholder:text-white h-[3rem]"
                  value={graveData.age}
                  onChange={handleInput}
                  type="number"
                  placeholder="Enter age"
                  name="age"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-white">
                  Date of Birth
                </Label>
                <Input
                  id="birthday"
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 placeholder:text-white h-[3rem]"
                  value={graveData.birthday.split('T')[0]}
                  onChange={handleInput}
                  type="date"
                  name="birthday"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_death" className="text-white">
                  Date of Death
                </Label>
                <Input
                  id="date_of_death"
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 placeholder:text-white h-[3rem]"
                  value={graveData.date_of_death.split('T')[0]}
                  onChange={handleInput}
                  type="date"
                  name="date_of_death"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={'secondary'}
                  className="w-full bg-white text-green-800 hover:bg-white/90 h-[3rem] rounded-full"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-white text-green-800 hover:bg-white/90 h-[3rem] rounded-full"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
