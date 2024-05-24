import { Suspense } from 'react';
import { LandingBody } from './LandingBody';

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <LandingBody />
      </Suspense>
    </main>
  );
}
