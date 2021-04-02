import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/products.service";
import { Book } from "../../model/books";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  public books: Array<Book>;
  public defaultImage =
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif";
  private sub;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }
  load = () => {
    this.sub = this.productService
      .getProducts("./assets/mock-data/books.json")
      .subscribe((res) => {
        this.books = res;
      });
  };
  addToCart = (product) => {
    this.cartService.addToCart({ product, quantity: 1 });
  };
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
