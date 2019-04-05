import {Component, DoCheck, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements DoCheck {


    @Input()
    maxPerPage: number;
    @Input()
    page: number;
    @Input()
    total: number;
    @Output()
    nextPage: EventEmitter<boolean> = new EventEmitter();
    @Output()
    previousPage: EventEmitter<boolean> = new EventEmitter();
    private noPrevious: boolean;
    private noNext: boolean;

    constructor() {
    }

    ngDoCheck(): void {
        this.noPrevious = this.cantChange(this.page - 1);
        this.noNext = this.cantChange(this.page + 1);
    }

    private cantChange(index: number): boolean {
        const tokens = JSON.parse(sessionStorage.getItem('nextPageToken'))[index];
        return tokens !== '' && !tokens;
    }

    onPreviousPage(): void {
        this.previousPage.emit(true);
    }

    noNextPage(): void {
        this.nextPage.emit(true);
    }

}
