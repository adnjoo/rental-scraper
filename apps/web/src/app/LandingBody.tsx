import Link from 'next/link';
import type { Apartment } from '@prisma/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export function ApartmentCard({ name, owner, area }: any) {
  return (
    <Card className='bg-slate-800 border border-slate-300'>
      <CardHeader>
        <CardTitle className='text-gray-200'>
          <Link href={`/prices/${name}`}>{name}</Link>
        </CardTitle>
        <CardDescription className='text-gray-400'>{owner}</CardDescription>
        <CardDescription className='text-gray-400'>{area}</CardDescription>
      </CardHeader>
    </Card>
  );
}

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
  const data = await res.json();
  return data;
}

export async function LandingBody() {
  const data = await getData();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-4 my-12 lg:mx-24 lg:my-24'>
      {data.apartments.map((apt: Apartment) => (
        <ApartmentCard
          key={apt.name}
          name={apt.name}
          owner={apt.owner}
          area={apt.area}
        />
      ))}
    </div>
  );
}
