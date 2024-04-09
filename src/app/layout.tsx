'use client';

import '../styles/global.scss';
import Header from '@/components/Header/Header';
import Logo from '@/components/Logo/Logo';
import Navigation from '@/components/Navigation/Navigation';
import StoreProvider from '@/store/StoreProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

if (process.env.NODE_ENV === 'development') {
  console.log('Mocking API calls');
  require('@/mocks');
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header>
            <Logo />
            <Navigation />
          </Header>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
