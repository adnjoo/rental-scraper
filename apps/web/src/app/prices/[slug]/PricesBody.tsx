import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getData({ slug }: { slug: string }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/prices/' + slug);
  const data = await res.json();
  return data;
}

export async function PricesBody({ slug }: { slug: string }) {
  const data = await getData({ slug });
  return (
    <div className='max-w-3xl mx-auto mt-12'>
      <Table>
        <TableCaption>Pricing information</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Studio</TableHead>
            <TableHead>1 Bedroom</TableHead>
            <TableHead>2 Bedroom</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((apt: any) => (
            <TableRow key={apt.id}>
              <TableCell>{new Date(apt.date).toLocaleDateString()}</TableCell>
              <TableCell>{apt.studio}</TableCell>
              <TableCell>{apt.oneBedroom}</TableCell>
              <TableCell>{apt.twoBedroom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
