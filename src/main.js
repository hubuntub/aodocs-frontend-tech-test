import { getRequestHeaders } from './auth';

function listDriveFile() {
  getRequestHeaders().then(options => console.log(options));
}

listDriveFile();
