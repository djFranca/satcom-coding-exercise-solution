import {Customer} from "../models/customer";
import {Product} from "../models/product";

export class ReflexionUtils {
  static isCustomer(element: Customer | Product): element is Customer {
    return "birthDate" in element;
  }

  static isProduct(element: Customer | Product): element is Product {
    return "price" in element;
  }
}
