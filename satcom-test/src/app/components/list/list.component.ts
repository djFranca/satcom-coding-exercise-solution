import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription, Observable, of} from "rxjs";
import { MockDataService } from 'src/app/services/mock-data.service';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();
  private mockDataService: MockDataService;
  public components: (Customer | Product)[];
  public componentsToList$: Observable<(Customer | Product)[]>;

  @Output() addComponentEvent = new EventEmitter<(Customer | Product)>();
  @Input() data: string;
  
  constructor(mockDataService: MockDataService) {
    this.mockDataService = mockDataService;
    this.components = [];
    this.componentsToList$ = new Observable<(Customer | Product)[]>;
  }

  ngOnInit(): void {
    this.initForm()
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue: string) => {
        this.onFilterChange(filterValue);
      })
    )
  }

  onFilterChange(inputSearched: string) {
    console.log("User input: " + inputSearched);

    var number = parseFloat(inputSearched) || 0.0;

    console.log("Number = " + number);

    if(number === 0.0){
      var filteredComponents = this.filteringComponentsByName(inputSearched.toLowerCase());
      this.componentsToList$ = of(filteredComponents);
      console.log("--> Number of filtered components = " + filteredComponents.length);
    }
    else{
      var filteredProducts = this.filteringComponentsByPrice(inputSearched);
      this.componentsToList$ = of(filteredProducts);
      console.log("--> Number of filtered products = " + filteredProducts.length);
    }
  }

  private isPremiumProduct(component: any): boolean{
    var isPremium: boolean = false;
    if(this.isProduct(component)){
      var product = <Product>component;
      if(product.premium === true){
        isPremium = true;
      }
    }
    return isPremium;
  }

  private isProduct(component: any): boolean{
    return component.name.toLowerCase().includes('product');
  }

  private filteringComponentsByName(inputSearched: string): (Customer | Product)[]{
    var filteredComponents: (Customer | Product)[] = [];

    this.components.forEach(component => {
      if(this.isPremiumProduct(component) || component.name.toLowerCase().includes(inputSearched)){
        filteredComponents.push(component);
      }
    });

    return filteredComponents;
  }

  private filteringComponentsByPrice(inputSearched: string): (Customer | Product)[]{
    var filteredComponents: (Customer | Product)[] = [];

    this.components.forEach(component => {
      if(this.isPremiumProduct(component)){
        filteredComponents.push(component);
      }
      if(!this.isPremiumProduct(component)){
        if(this.isProduct(component)){
          var product = <Product>component;
          console.log("Product filtered by price: " + JSON.stringify(product));
          if(product.price.toFixed(2).toString().includes(inputSearched)){
            filteredComponents.push(component);
          }
        }
      }
    });

    return filteredComponents;
  }

  getData(): void {
    this.mockDataService.getData().subscribe((response: (Customer | Product)[]) => this.components = response);

    if(this.components.length > 0){
      this.componentsToList$ = of(this.components);
    }
  }

  onSelectedComponent(component: (Customer | Product)): void{
    console.log("List --> " + JSON.stringify(component));
    this.addComponentEvent.emit(component);
  }
}
