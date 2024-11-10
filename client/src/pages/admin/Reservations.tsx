import BGImage from '@/assets/bg.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

import EmailForm from '@/components/EmailForm';
import PaginationTemplate from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import usePagination from '@/hooks/usePagination';
import axios from 'axios';
import { MessageCircleMore } from 'lucide-react';
import moment from 'moment';

interface ReservationItem {
  reservation_id: number;
  fullname: string;
  plot_no: number;
  contact_info: string;
  date: string;
  created_at: string;
  message: string;
  status: string;
}
const Reservations = () => {
  const [reservationsData, setReservationsData] = useState<ReservationItem[]>(
    [],
  );
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [sendToEmail, setSendToEmail] = useState('');
  const [sendToName, setSendToName] = useState('');
  const [reservationStatus, setReservationStatus] = useState('All');
  const [reservationID, setReservationID] = useState(0);
  const [searchReservation, setSearchReservation] = useState('');
  const itemsPerPage = 10;

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/reservation`,
      );

      console.log(res.data, 'reservations');

      setReservationsData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredReservations = reservationsData.filter(
    (reservation) =>
      (reservation.fullname
        .toLowerCase()
        .includes(searchReservation.toLowerCase()) ||
        reservation.contact_info
          .toLowerCase()
          .includes(searchReservation.toLowerCase())) &&
      (reservation.status === reservationStatus || reservationStatus === 'All'),
  );

  const { currentItems, totalPages, currentPage, handlePageChange } =
    usePagination({
      itemsPerPage: itemsPerPage,
      data: filteredReservations || [],
    });

  const handleDeleteReservations = async (id: number) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_LINK}/api/reservation/delete/${id}`,
      );

      console.log(res.data);

      toast({
        title: 'Success',
        description: 'Reservations deleted successfully',
      });

      fetchReservations();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-[800px] w-full flex justify-start flex-col items-center">
      <div className="text-start w-full flex justify-between items-center my-[4rem]">
        <h2 className="text-2xl font-bold mb-4 text-start ">
          LIST OF PLOT RESERVATIONS
        </h2>

        <div className="flex items-center h-[4rem] gap-4">
          <Select onValueChange={(value) => setReservationStatus(value)}>
            <SelectTrigger className="w-[180px] h-full">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setSearchReservation(e.target.value)}
            placeholder="Search for a reservation"
            className="w-[350px] h-full placeholder:text-white"
          />
        </div>
      </div>
      <div className="w-[80%]">
        <Table>
          <TableCaption className="text-white/70">
            list of plot reservations
          </TableCaption>
          <TableHeader>
            <TableRow className="border-white/20">
              <TableHead className="text-white text-center">ID</TableHead>
              <TableHead className="text-white text-center">
                Full Name
              </TableHead>
              <TableHead className="text-white text-center">
                Preffered Plot No.
              </TableHead>
              <TableHead className="text-white text-center">
                Contact Info
              </TableHead>
              <TableHead className="text-white text-center">
                Preffered Date
              </TableHead>

              <TableHead className="text-white text-center">Message</TableHead>

              <TableHead className="text-white text-center">Status</TableHead>

              <TableHead className="text-white text-center">
                Created at
              </TableHead>

              <TableHead className="text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((reservation) => (
              <TableRow
                key={reservation.reservation_id}
                className="border-white/20"
              >
                <TableCell className="font-medium text-white">
                  {reservation.reservation_id}
                </TableCell>
                <TableCell className="text-white">
                  {reservation.fullname}
                </TableCell>
                <TableCell className="text-white">
                  {reservation.plot_no}
                </TableCell>
                <TableCell className="text-white">
                  {reservation.contact_info}
                </TableCell>
                <TableCell className="text-white">
                  {moment(reservation.date).format('MMM Do YY')}
                </TableCell>
                <TableCell className="text-white">
                  {reservation.message}
                </TableCell>

                <TableCell className="text-white">
                  {reservation.status === 'Pending' ? (
                    <span className="text-yellow-500">
                      {reservation.status}
                    </span>
                  ) : (
                    <span className="text-green-500">{reservation.status}</span>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  {moment(reservation.created_at).format('MMM Do YY')}
                </TableCell>
                <TableCell className="w-[250px]">
                  <div>
                    {/* <Button
                      onClick={() =>
                        handleDeleteReservations(reservation.reservation_id)
                      }
                      variant="ghost"
                      className="text-white  hover:bg-yellow-500/20 w-fit"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button> */}

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          className="text-white  hover:bg-yellow-500/20 w-fit"
                        >
                          <MessageCircleMore className="h-4 w-4" />
                          Respond
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {reservation.contact_info.includes('@') ? (
                          <DropdownMenuItem
                            onClick={() => {
                              setSendToEmail(reservation.contact_info);
                              setSendToName(reservation.fullname);
                              setReservationID(reservation.reservation_id);
                              setShowEmailForm(true);
                            }}
                            className="text-black"
                          >
                            Send Email
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-black">
                            Send SMS
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {reservationsData.length === 0 && (
              <TableRow className="border-white/20">
                <TableCell colSpan={6} className="text-center text-white/50">
                  No reservations added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <PaginationTemplate
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>

      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div
            className="w-[40%] h-fit bg-white text-[#fff6f2] rounded-2xl p-4 shadow-lg"
            style={{ backgroundImage: `url(${BGImage})` }}
          >
            <EmailForm
              fetchReservations={fetchReservations}
              reservationID={reservationID}
              sendToName={sendToName}
              setShowEmailForm={setShowEmailForm}
              sendTo={sendToEmail}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
