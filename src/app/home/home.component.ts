import {Component, OnInit} from '@angular/core';

import {FilesService} from './files.service';
import File from './File';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    private files: File[];

    constructor(private filesService: FilesService) {
    }

    ngOnInit() {
        this.filesService.getFiles(25)
            .subscribe(files => this.files = files);
    }

    toggleSelection(selected: File): void {
        this.files = this.files.map(file => {
            return file.id === selected.id ? {...file, isSelected: !file.isSelected} : file;
        });
    }


    star(): void {
        this.toggleFavorite(true);
    }

    unstar(): void {
        this.toggleFavorite(false);
    }

    private toggleFavorite(favorite: boolean): void {
        this.files = this.files.map(file => {
            if (file.isSelected) {
                const updated = {...file, isSelected: !file.isSelected, starred: favorite};
                this.filesService.update(updated).subscribe();
                return updated;
            }
            return file;
        });
    }

}
