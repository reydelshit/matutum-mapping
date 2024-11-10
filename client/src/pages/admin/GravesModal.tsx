import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
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

      console.log(res.data.status);

      if (res.data.status === 'success') {
        toast({
          title: 'Success',
          description: 'Grave added successfully',
        });

        fetchGravesModal();
        fetchGraves();
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

      fetchGravesModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 text-black">
      <div className="w-[80%] h-[80%] border-2 bg-white rounded-2xl p-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <h1 className="font-semibold text-2xl">{selectedPlot}</h1>

            <span>{graves.length} / 5</span>
          </div>

          <Button onClick={() => setShowModal(false)}>Closess</Button>
        </div>

        <div className="w-full">
          <h1>ADD GRAVE</h1>
          <div className="flex justify-between gap-8 mt-4">
            <form onSubmit={handleAddGrave} className=" w-[50%]">
              <Label>Fullname</Label>
              <Input
                className="h-[3rem]"
                onChange={handleInput}
                type="text"
                placeholder="Fullname"
                name="fullname"
              />

              <Label>Age</Label>
              <Input
                className="h-[3rem]"
                name="age"
                onChange={handleInput}
                type="number"
                placeholder="Age"
              />

              <Label>Birthday</Label>
              <Input
                className="h-[3rem]"
                name="birthday"
                onChange={handleInput}
                type="date"
              />

              <Label>Date of Death</Label>
              <Input
                className="h-[3rem]"
                name="date_of_death"
                onChange={handleInput}
                type="date"
              />

              <Button className="mt-2" disabled={graves.length >= 5}>
                {graves.length >= 5 ? 'PLOT IS FULL' : 'SAVE'}
              </Button>
            </form>

            <div className="w-[50%]">
              <h1>LIST OF GRAVES INSIDE OF PLOT</h1>
              <Table>
                <TableCaption>
                  A list of graves in plot {selectedPlot}.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>Grave ID</TableCell>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Date of Death</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {graves.map((grave, index) => (
                    <TableRow key={index}>
                      <TableCell>{grave.grave_id}</TableCell>
                      <TableCell>{grave.fullname}</TableCell>
                      <TableCell>{grave.birthday}</TableCell>
                      <TableCell>{grave.date_of_death}</TableCell>
                      <TableCell>{grave.age}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteGrave(grave.grave_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraveModal;
