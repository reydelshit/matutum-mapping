import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import BGImage from '@/assets/bg.png';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface GraveItem {
  grave_id: number;
  fullname: string;
  birthday: string;
  date_of_death: string;
  age: number;
  created_at: string;
  plot_no: string;
}

const GraveModal = ({
  setShowModal,
  selectedPlot,
  fetchGraves,
}: {
  setShowModal: (show: boolean) => void;
  selectedPlot: string;
  fetchGraves: () => void;
}) => {
  console.log(selectedPlot);

  const [graveData, setGraveData] = useState({
    fullname: '',
    age: 0,
    birthday: '',
    date_of_death: '',
  });

  const [graves, setGraves] = useState<GraveItem[]>([]);

  const fetchGravesModal = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/${selectedPlot}`,
      );

      console.log(res.data, 'selected graves from modal');

      setGraves(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGravesModal();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGraveData({
      ...graveData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddGrave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(graveData, selectedPlot);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/create`,
        {
          ...graveData,
          plot_no: selectedPlot,
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res.data, 'sdandk');

      if (res.data.status === 'success') {
        toast({
          title: 'Success',
          description: 'Grave added successfully',
        });

        fetchGravesModal();
        fetchGraves();

        setGraveData({
          fullname: '',
          age: 0,
          birthday: '',
          date_of_death: '',
        });
      }
    } catch (e) {
      console.log(e);
    }
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

      fetchGravesModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-black">
      <Card
        className="w-full max-w-6xl mx-auto border-none text-white"
        style={{ backgroundImage: `url(${BGImage})` }}
      >
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-3xl font-bold text-center flex justify-between">
            <h1> Grave Management - {selectedPlot}</h1>
            <Button
              onClick={() => {
                setShowModal(false);
                fetchGraves();
              }}
              className="w-fit bg-white text-green-800 hover:bg-white/90"
            >
              Close
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">Add New Grave</h2>
              <form onSubmit={handleAddGrave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    className="bg-white/20 border-white/30 text-white placeholder-white/50 placeholder:text-white"
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
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
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
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                    value={graveData.birthday}
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
                    className="bg-white/20 border-white/30 text-white placeholder-white/50"
                    value={graveData.date_of_death}
                    onChange={handleInput}
                    type="date"
                    name="date_of_death"
                    required
                  />
                </div>

                <Button
                  className="w-full bg-white text-green-800 hover:bg-white/90"
                  disabled={graves.length >= 5}
                  type="submit"
                >
                  {graves.length >= 5 ? 'Plot is Full' : 'Add Grave'}
                </Button>
              </form>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Graves in Plot</h2>
              <Table>
                <TableCaption className="text-white/70">
                  Current graves in Plot 79 ({graves.length}/5)
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">Full Name</TableHead>
                    <TableHead className="text-white">Date of Birth</TableHead>
                    <TableHead className="text-white">Date of Death</TableHead>
                    <TableHead className="text-white">Age</TableHead>
                    <TableHead className="text-white text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {graves.map((grave) => (
                    <TableRow key={grave.grave_id} className="border-white/20">
                      <TableCell className="font-medium text-white">
                        {grave.grave_id}
                      </TableCell>
                      <TableCell className="text-white">
                        {grave.fullname}
                      </TableCell>
                      <TableCell className="text-white">
                        {moment(grave.birthday).format('MMM Do YY')}
                      </TableCell>
                      <TableCell className="text-white">
                        {moment(grave.date_of_death).format('MMM Do YY')}
                      </TableCell>
                      <TableCell className="text-white">{grave.age}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteGrave(grave.grave_id)}
                          className="text-white hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {graves.length === 0 && (
                    <TableRow className="border-white/20">
                      <TableCell
                        colSpan={6}
                        className="text-center text-white/50"
                      >
                        No graves added yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraveModal;
