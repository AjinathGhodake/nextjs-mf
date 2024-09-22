import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const PDPPage = dynamic(() => import('remoteApp/PDPPage'), {
  suspense: true,
  loading: () => <div>Loading PDP...</div>,
  ssr: false,
});

const RemoteComponent: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading PDP...</div>}>
      <PDPPage />
    </Suspense>
  );
};

export default RemoteComponent;
