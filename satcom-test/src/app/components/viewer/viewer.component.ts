import {Component, ComponentRef, OnDestroy, OnInit, ViewContainerRef, Input, EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerComponent} from "../customer/customer.component";
import {PremiumProductComponent} from "../premium-product/premium-product.component";
import {ProductComponent} from "../product/product.component";
import {DynamicComponentsMapperUtils} from "../../utils/dynamic-components-mapper.utils";
import {Customer} from "../../models/customer";
import {Product} from "../../models/product";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})

export class ViewerComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  currentComponent: ComponentRef<CustomerComponent | PremiumProductComponent | ProductComponent>;
  @Input() eventEmitter: EventEmitter<(Customer | Product)>;
  private selectedComponent: (Customer | Product);

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.subscribeEventEmitter();
  }

  subscribeEventEmitter(): void{
    this.eventEmitter.subscribe(
      (component: (Customer | Product)) => {
        this.selectedComponent = component;
        this.addDetailsComponentToView(this.selectedComponent);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addDetailsComponentToView(element: Customer | Product): void {
    console.log("Viewer --> " + JSON.stringify(element));
    if (this.currentComponent != null) {
      this.currentComponent.destroy();
    }
    const component = DynamicComponentsMapperUtils.getComponent(element);
    this.currentComponent = this.viewContainerRef.createComponent(component);
    this.currentComponent.instance.element = element;
    this.viewContainerRef.insert(this.currentComponent.hostView);
  }
}
