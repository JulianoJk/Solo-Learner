import React from 'react';
import TokenExpirationChecker from './TokenExpirationChecker';

const TokenExpirationCheckerProvider = () => {
  return (
    <TokenExpirationChecker
      onSessionExpired={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default TokenExpirationCheckerProvider;
