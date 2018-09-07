import { getRequestHeaders } from './auth';

async function listDriveFile(): Promise<void> {
  const options = await getRequestHeaders();

  console.log(options);
}

listDriveFile();
