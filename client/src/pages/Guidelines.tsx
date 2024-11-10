import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Guidelines() {
  return (
    <div className="container mx-auto px-4 py-8 text-[#fff6f2]">
      <h1 className="text-3xl font-bold mb-6">
        Matutum Memorial Park Guidelines
      </h1>

      <div className="grid gap-6 grid-cols-2">
        <Card className="bg-transparent !text-[#fff6f2]">
          <CardHeader>
            <CardTitle>Visiting Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The park is open daily from 6:00 AM to 6:00 PM.</p>
          </CardContent>
        </Card>

        <Card className="bg-transparent !text-[#fff6f2]">
          <CardHeader>
            <CardTitle>Respect and Etiquette</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 ">
              <li>Please maintain a quiet and respectful atmosphere.</li>
              <li>Do not touch or disturb memorials or offerings.</li>
              <li>Keep children under supervision at all times.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-transparent !text-[#fff6f2]">
          <CardHeader>
            <CardTitle>Decorations and Memorials</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fresh flowers are welcome at all times.</li>
              <li>Artificial flowers are allowed from November to March.</li>
              <li>No glass containers, candles, or breakable items.</li>
              <li>
                The park reserves the right to remove any inappropriate or
                unsafe items.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-transparent !text-[#fff6f2]">
          <CardHeader>
            <CardTitle>Vehicle and Parking Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Drive slowly and carefully within the park grounds.</li>
              <li>Park only in designated areas.</li>
              <li>Do not leave valuables in your vehicle.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <Card className="bg-transparent !text-[#fff6f2]">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription className="text-white">
            Please note the following guidelines:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pets are not allowed in the park, except for service animals.
            </li>
            <li>Smoking is prohibited throughout the park grounds.</li>
            <li>Picnicking is not permitted within the memorial park.</li>
            <li>
              Photography for personal use is allowed. Commercial photography
              requires prior permission.
            </li>
            <li>Please dispose of trash in the provided receptacles.</li>
          </ul>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm">
        These guidelines are in place to ensure a peaceful and respectful
        environment for all visitors. Thank you for your cooperation and
        understanding. If you have any questions, please contact the park
        office.
      </p>
    </div>
  );
}
