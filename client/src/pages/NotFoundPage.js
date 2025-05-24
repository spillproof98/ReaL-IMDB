import React from 'react';
import notFound from '../Assets/images/not-found.png';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <img src={notFound} alt="404 Not Found" style={{ width: '300px', marginTop: '20px' }} />
    </div>
  );
}
