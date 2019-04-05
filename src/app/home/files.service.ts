import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import File from './File';
import * as m from "moment";

@Injectable()
export class FilesService {

    readonly API_URL = 'https://www.googleapis.com/drive/v3/files';
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }

    getFiles(maxNumber: number): Observable<File[]> {
        const headers = this.headers;
        let url = `${this.API_URL}/?pageSize=${maxNumber}&fields=kind,files(id,name,thumbnailLink,modifiedTime,webViewLink)`;

        return this.http.get(url,
            {headers}).pipe(map((response: any) => {
            return this.transform(response.files);
        }));
    }

    private transform(files: any): File[] {
        return files.map((file: any) => {
            return {...file,
                modifiedTime: m(file.modifiedTime).fromNow(),
                isSelected: false};
        });
    }
}
