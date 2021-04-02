export const appRoutes = [
  {
    path: "",
    redirectTo: "category",
    pathMatch: "full",
  },
  {
    path: "category",
    loadChildren: "./pages/category/category.module#CategoryModule",
  },
  {
    path: "product",
    loadChildren: "./pages/product/product.module#ProductModule",
  },
  {
    path: "cart",
    loadChildren: "./pages/cart/cart-page.module#CartPageModule",
  },
  {
    path: "**",
    loadChildren: "./pages/category/category.module#CategoryModule",
  },
];
