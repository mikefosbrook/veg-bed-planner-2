async function initMocks() {
  if (typeof window === 'undefined') {
    console.log('Starting server listener');
    const { server } = await import('./server');
    server.listen();
  } else {
    console.log('Starting browser listener');
    const { worker } = await import('./browser');
    worker.start();
  }
}

initMocks();

export {};
