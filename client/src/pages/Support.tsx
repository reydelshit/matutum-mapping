import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CustomerSupport() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [plotType, setPlotType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', { name, email, date, plotType });
    // Reset form fields
    setName('');
    setEmail('');
    setDate('');
    setPlotType('');
  };

  return (
    <div className="flex h-[750px] items-center justify-center">
      <div className="w-1/2 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Matutum Memorial Park FAQs</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How do I use the interactive mapping system?
            </AccordionTrigger>
            <AccordionContent>
              Use your mouse or touchscreen to navigate the map, zoom in/out,
              and click on areas for more information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I reserve a plot online?</AccordionTrigger>
            <AccordionContent>
              Yes, use the reservation form on the right to submit your request.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What types of plots are available?
            </AccordionTrigger>
            <AccordionContent>
              We offer single plots, family plots, and mausoleum spaces.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What are the visiting hours?</AccordionTrigger>
            <AccordionContent>
              The park is open from 6:00 AM to 6:00 PM daily.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Do you offer maintenance services?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we provide regular maintenance for all plots, including lawn
              care and general upkeep.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {/* <div className="w-1/2 h-[70%] p-6 bg-white rounded-md text-black ">
        <h2 className="text-2xl font-bold mb-4 text-black ">
          Make a Reservation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div>
            <Label className="text-black" htmlFor="name">
              Name
            </Label>
            <Input
              className="h-[3rem]"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="text-black" htmlFor="email">
              Email
            </Label>
            <Input
              className="h-[3rem]"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="text-black" htmlFor="date">
              Preferred Date
            </Label>
            <Input
              className="h-[3rem] text-black"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-black" htmlFor="plotType">
              Plot Type
            </Label>
            <Select value={plotType} onValueChange={setPlotType}>
              <SelectTrigger id="plotType" className="w-full">
                <SelectValue placeholder="Select a plot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Plot</SelectItem>
                <SelectItem value="family">Family Plot</SelectItem>
                <SelectItem value="mausoleum">Mausoleum Space</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="bg-green-800 h-[3rem] w-fit rounded-full"
            type="submit"
          >
            Submit Reservation Request
          </Button>
        </form>
      </div> */}
    </div>
  );
}
