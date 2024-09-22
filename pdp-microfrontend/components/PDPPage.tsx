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

const ProductImage = () => {
  const seed = React.useMemo(() => Math.floor(Math.random() * 1000), []);
  return (
    <Image
      src={`https://picsum.photos/seed/${seed}/300/300`}
      alt="Product image"
      width={300}
      height={300}
      priority
      loading="eager"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    />
  );
};

const PDPPage: React.FC = () => {
  return (
    <div>
      <h1>Product Detail Page</h1>
      <ProductImage />
      <NonCriticalComponent />
    </div>
  );
};

export default PDPPage;
