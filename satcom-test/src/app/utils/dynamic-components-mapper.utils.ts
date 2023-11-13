import {Component, ComponentRef, Type} from "@angular/core";
import {Product} from "../models/product";
import {Customer} from "../models/customer";
import {CustomerComponent} from "../components/customer/customer.component";
import {PremiumProductComponent} from "../components/premium-product/premium-product.component";
import {ProductComponent} from "../components/product/product.component";
import {ReflexionUtils} from "./reflexion.utils";

export class DynamicComponentsMapperUtils {
  static getComponent(element: Customer | Product): Type<CustomerComponent | PremiumProductComponent | ProductComponent> {
    if (ReflexionUtils.isCustomer(element)) {
      return CustomerComponent
    }

    if (element.premium) {
      return PremiumProductComponent;
    } else {
      return ProductComponent;
    }
  }
}
