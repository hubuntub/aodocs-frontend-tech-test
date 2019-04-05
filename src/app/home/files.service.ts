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
        sessionStorage.removeItem('nextPageToken');
    }

    getFiles(maxNumber: number, page: number): Observable<File[]> {
        const headers = this.headers;
        return this.http.get(this.buildUrl(maxNumber, page),
            {headers}).pipe(map((response: any) => {
                this.store(response, page);
                return this.transform(response.files);
        }));
    }

    private buildUrl(maxNumber: number, page: number): string {
        let url = `${this.API_URL}/?pageSize=${maxNumber}&fields=kind,nextPageToken,files(id,name,thumbnailLink,modifiedTime,webViewLink,starred)`;
        const pageToken = this.getTokenPage(page);
        if (pageToken) {
            url = `${url}&pageToken=${pageToken}`;
        }
        return url;
    }

    private getTokenPage(page: number): string {
        const tokens = JSON.parse(sessionStorage.getItem('nextPageToken'));
        if (!tokens) {
            sessionStorage.setItem('nextPageToken', JSON.stringify({0: ''}));
            return '';
        }
        return tokens[page];
    }

    private store(response: any, page: number): void {
        const oldTokens = JSON.parse(sessionStorage.getItem('nextPageToken'));
        oldTokens[page + 1] = response.nextPageToken;
        sessionStorage.setItem('nextPageToken', JSON.stringify(oldTokens));
    }

    private transform(files: any): File[] {
        return files.map((file: any) => {
            return {...file,
                modifiedTime: m(file.modifiedTime).fromNow(),
                isSelected: false};
        });
    }

    update(file: File): Observable<any> {
        const headers = this.headers;
        return this.http.patch(`${this.API_URL}/${file.id}?alt=json`,
            {starred: file.starred}, {headers});
    }
}
