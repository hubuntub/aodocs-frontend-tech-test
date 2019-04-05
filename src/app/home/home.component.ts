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

}
