import dynamic from 'next/dynamic';
import React from 'react';

const FallbackPDP = () => (
  <div>Unable to load PDP. Please try again later.</div>
);
FallbackPDP.displayName = 'FallbackPDP';

const RemotePDP = dynamic(
  () => import('remoteApp/PDPPage').catch(() => FallbackPDP),
  {
    ssr: false,
    loading: () => <div>Loading PDP...</div>,
  }
);
RemotePDP.displayName = 'RemotePDP';

const RemotePDPPage = () => <RemotePDP />;
RemotePDPPage.displayName = 'RemotePDPPage';

export default RemotePDPPage;
