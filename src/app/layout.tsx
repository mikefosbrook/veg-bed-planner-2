import type { Metadata } from 'next';
import '../styles/global.scss';
import Header from '@/components/Header/Header';
import Logo from '@/components/Logo/Logo';
import Navigation from '@/components/Navigation/Navigation';
import { store } from '@/store';
import { Provider } from 'react-redux';

export const metadata: Metadata = {
  title: 'Veg Planner App',
  description: 'A vegetable bed planning app based on the Square Foot Gardening technique',
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header>
            <Logo />
            <Navigation />
          </Header>
          {children}
        </body>
      </html>
    </Provider>
  );
}
