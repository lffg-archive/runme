import start from './main';

start().catch((error: Error) => {
  console.log('Whoops! Error:');
  console.error(error);
});
