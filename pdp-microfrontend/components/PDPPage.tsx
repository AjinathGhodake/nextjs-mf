// pdp-microfrontend/components/PDPPage.tsx

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const NonCriticalComponent = dynamic(
  () => import('../components/NonCriticalComponent'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const PDPPage: React.FC = () => {
  return (
    <div>
      <h1>Product Detail Page</h1>
      <Image
        src={`https://picsum.photos/seed/${Math.floor(
          Math.random() * 1000
        )}/300/300`}
        alt="Product"
        width={300}
        height={300}
        priority // Add priority for above-the-fold image
      />
      <NonCriticalComponent />
    </div>
  );
};

export default PDPPage;
