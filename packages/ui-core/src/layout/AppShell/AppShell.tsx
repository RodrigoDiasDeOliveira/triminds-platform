import { AppShellProps } from './AppShell.types';
import { AppShellContext } from './AppShell.context';
import { styles } from './AppShell.styles';

export function AppShell({
  header,
  sidebar,
  children,
  variant = 'default',
  density = 'comfortable',
  className
}: AppShellProps) {
  return (
    <AppShellContext.Provider value={{ variant, density }}>
      <div className={`${styles.shell} ${className ?? ''}`} data-variant={variant} data-density={density}>
        {header && <header className={styles.header}>{header}</header>}
        <div className={styles.body}>
          {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
