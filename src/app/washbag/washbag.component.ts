import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './washbag-model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { WashbagService } from './washbag.service';
import { DictionaryService } from '../shared-module/services/dictionary.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { DictData } from '../model/common.model';
import { ConfirmationComponent } from '../shared-module/confirmation/confirmation.component';

@Component({
  selector: 'app-washbag',
  templateUrl: './washbag.component.html',
  styleUrls: ['./washbag.component.less'],
})
export class WashbagComponent implements OnInit {
  products: Product[];
  productId = null;
  displayedColumns: string[] = [
    'name',
    'categoryId',
    'courseOfActionId',
    'rate',
    'availability',
    'action',
  ];
  userId: number = this.authService.getUserId();
  coaDict: DictData[];
  pcDict: DictData[];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private dictionaryService: DictionaryService,
    private authService: AuthService,
    private washbagService: WashbagService
  ) {}

  openDialog(name: string, isEditMode?: boolean, product?: Product): void {
    if (name === 'productForm') {
      const dialog = this.dialog.open(ProductFormComponent, {
        width: '50vw',
        data: {
          product,
          isEditMode,
          dicts: {
            coaDict: this.coaDict,
            pcDict: this.pcDict,
          },
        },
      });
      dialog.afterClosed().subscribe((data) => {
        if (data) {
          this.loadProducts();
        }
      });
    }
    if (name === 'canDelete') {
      const dialog = this.dialog.open(ConfirmationComponent, {
        width: '35vw',
        data: {
          message: 'Czy na pewno chcesz usunąć wybrany produkt?',
        },
      });
      dialog.afterClosed().subscribe((data) => {
        if (data === 'confirmed') {
          this.washbagService.deleteProduct(product.id).subscribe(
            () => {
              this.loadProducts();
            }
          );
        }
      });
    }
  }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    const [coaDict, pcDict] = await Promise.all([
      this.dictionaryService.getCoaDict(),
      this.dictionaryService.getPcDict(),
    ]);
    this.coaDict = coaDict;
    this.pcDict = pcDict;
    this.loadProducts();
  }

  loadProducts(): void {
    this.washbagService.getProducts(this.userId).subscribe((result) => {
      this.products = result.products;
      this.dataSource = new MatTableDataSource(this.products);

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
