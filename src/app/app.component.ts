import { Component, OnInit, ViewChild } from '@angular/core';
import { MercadoLibreService } from '../services/mercado-libre.service';
import { MenuItem, TreeNode } from 'primeng/api';
import { TreeTable } from 'primeng/treetable';
import { Search } from '../models/search';
import { Dialog } from 'primeng/dialog';
import { Subscription, interval } from 'rxjs';
import { Specialty } from '../models/specialty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  source = interval(60000);
  subscription: Subscription = this.source.subscribe(() => this.updateListOfProducts());


  title = 'botSalesR';
  sectionSelected = 'searches';
  items!: MenuItem[];
  colsSearches!: any[];
  colsProducts!: any[];
  searchesTree!: TreeNode[];
  productsTree!: TreeNode[];
  filterMode = 'lenient';
  filterModes = [
      { label: 'Aproximado', value: 'lenient' },
      { label: 'Estricto', value: 'strict' }
  ];
  visibleDialogNewUpdate = false;
  searchUpdateOrNew: Search =
  {
    title: '',
    slug: '',
    productString: '',
    frequency: 1,
    active: true,
    createdAt: '',
    updatedAt: '',
    copys: 1
  };
  updateOrNew = 'update';
  specialtyList= [
    { name: 'Ingeniería Bioquímica', code: Specialty.Ingeniería_Bioquímica },
    { name: 'Ingeniería Civil', code: Specialty.Ingeniería_Civil },
    { name: 'Ingeniería Electromecánica', code: Specialty.Ingeniería_Electromecánica },
    { name: 'Ingeniería Industrial', code: Specialty.Ingeniería_Industrial },
    { name: 'Ingeniería Informática', code: Specialty.Ingeniería_Informática },
    { name: 'Ingeniería Mecatrónica', code: Specialty.Ingeniería_Mecatrónica },
    { name: 'Ingeniería Química', code: Specialty.Ingeniería_Química },
    { name: 'Ingeniería en Gestión Empresarial', code: Specialty.Ingeniería_en_Gestión_Empresarial },
    { name: 'Ingeniería en Sistemas Computacionales', code: Specialty.Ingeniería_en_Sistemas_Computacionales },
  ];


  @ViewChild('tt') treetableProducts!: TreeTable;
  @ViewChild(Dialog) dialogModalUpdateNew!: Dialog;


  constructor(private mercadolibre:MercadoLibreService) {
  }

  ngOnInit(): void {
    this.updateListOfSearches();
    this.updateListOfProducts();
    this.colsSearches = [
      { field: 'title', header: 'Titulo' },
      { field: 'productString', header: 'Palabra del producto' },
      { field: 'createdAt', header: 'Creado/Actualizado' },
      { field: 'copys', header: 'Copias' },
      { field: 'specialty', header: 'Carrera' },
      { field: 'actions', header: 'Acciones' }
    ];

    this.colsProducts = [
      { field: 'title', header: 'Titulo' },
      { field: 'idML', header: 'Id Mercado Libre' },
      { field: 'condition', header: 'Condicion' },
      { field: 'createdAt', header: 'Fecha de creación' },
      { field: 'permalink', header: 'Enlace a ML' },
      { field: 'price', header: 'Precio/MXN' },
      { field: 'updatedAt', header: 'Fecha de Actualización' },
      { field: 'thumbnail', header: 'Vista Previa' }
    ];

    this.items = [
      {
          label: 'Libros',
          icon: 'pi pi-fw pi-search',
          command: () => this.selectOptionMenu('searches')
      },
      {
          label: 'Sugerencias de compra',
          icon: 'pi pi-fw pi-filter',
          command: () => this.selectOptionMenu('products')
      }
    ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectOptionMenu(option:string):void {
    this.sectionSelected = option;
  }

  updateListOfSearches():void {
    this.mercadolibre.getSearches().subscribe((searches) => {
      this.searchesTree = [];
      searches.forEach(search => {
        search.createdAt = this.fixDate(search.createdAt);
        this.searchesTree.push({data:search})
      });
    });
  }

  updateListOfProducts():void {
    this.mercadolibre.getAllProducts().subscribe((products) => {
      this.productsTree = [];
      console.log(products);
      products.forEach(product => {
        product.createdAt = this.fixDate(product.createdAt);
        product.updatedAt = this.fixDate(product.updatedAt);
        this.productsTree.push({data:product})
      });
    });
  }

  fixDate(dateOriginal:string | undefined):string {
    return new Date(dateOriginal!).toLocaleDateString() + " " + new Date(dateOriginal!).toLocaleTimeString();
  }

  filterTableProducts(tableProductsFilter: Event ): void {
    const inputData = tableProductsFilter?.target as HTMLInputElement;
    this.treetableProducts.filterGlobal(inputData.value, 'contains');
  }

  deleteSearch(rowData: Search):void {
    console.log(rowData);
    this.mercadolibre.deleteSearch(rowData).subscribe(() => {
      this.updateListOfSearches();
      this.updateListOfProducts();
    });
  }

  showDialogUpdateNew(rowData: Search, mode:string):void{
    this.updateOrNew = mode;
    this.visibleDialogNewUpdate = true;
    if (this.updateOrNew === 'update') {
      this.searchUpdateOrNew = rowData;
    } else {
      this.searchUpdateOrNew =
      {
        title: '',
        slug: '',
        productString: '',
        frequency: 1,
        active: true,
        createdAt: '',
        updatedAt: ''
      };
    }
  }

  updateOrSaveSearch(mode:string){
    if (mode === 'update') {
      this.searchUpdateOrNew.createdAt = new Date().toString();
      this.searchUpdateOrNew.specialty = this.searchUpdateOrNew.specialty.code;
      this.mercadolibre.updateSearch(this.searchUpdateOrNew).subscribe(()=>{
        this.updateListOfSearches();
      });
    } else {
      this.searchUpdateOrNew.slug = (Math.random() + 1).toString(36).substring(5);
      this.searchUpdateOrNew.specialty = this.searchUpdateOrNew.specialty.code;
      this.mercadolibre.createSearch(this.searchUpdateOrNew).subscribe(()=>{
        this.updateListOfSearches();
      });
    }
    this.visibleDialogNewUpdate = false;
  }

  getCarrera(codeCarrera:number){
    return this.specialtyList?.find(({ code })=> code === codeCarrera)?.name;
  }

  getTitle():string{
    if (this.updateOrNew === 'update') {
      return 'Update search';
    } else {
      return 'Create search';
    }
  }
}
