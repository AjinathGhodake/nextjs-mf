// pdp-microfrontend/components/PDPPage.tsx

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const NonCriticalComponent = dynamic(() => import('./NonCriticalComponent'), {
  ssr: false,
});

const PDPPage: React.FC = () => {
  return (
    <div>
      <h1>Product Detail Page</h1>
      <Image
        src="https://via.placeholder.com/500x500.jpg?text=Product+Image"
        alt="Product"
        width={500}
        height={500}
        loading="eager"
      />
      <NonCriticalComponent />
    </div>
  );
};

export default PDPPage;
