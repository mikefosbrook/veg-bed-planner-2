import style from './Header.module.scss';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <>
      <header className={style.header}>{children}</header>{' '}
    </>
  );
}
