import { MatPaginatorIntl } from '@angular/material/paginator';

export const CustomPaginator = () => {
    const customPaginator = new MatPaginatorIntl();

    customPaginator.itemsPerPageLabel = 'Ilość elementów na stronę';
    customPaginator.nextPageLabel = 'Następna strona';
    customPaginator.previousPageLabel = 'Poprzednia strona';
    customPaginator.firstPageLabel = 'Przejdź na pierwszą stronę';
    customPaginator.lastPageLabel = 'Przejdź na ostatnią stronę';
    customPaginator.getRangeLabel = (page: number, pageSize: number, length: number) =>  {
        if (length === 0 || pageSize === 0) {
          return `0 z ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} z ${length}`;
      };
    return customPaginator;
}
