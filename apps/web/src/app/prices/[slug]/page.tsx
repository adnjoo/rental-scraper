import { Suspense } from 'react';
import { PricesBody } from './PricesBody';
import Link from 'next/link';

export default async function PricesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  return (
    <div>
      <Link href='/'>Home</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PricesBody slug={slug} />
      </Suspense>
    </div>
  );
}
