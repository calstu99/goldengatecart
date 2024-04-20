import Cart from "@/components/Cart";
import Nav from "@/components/Nav";
import CartModal from "@/components/CartModal";
import Product from "@/components/Product";
import products from "@/app/data/products";
import Hero from "./Hero";
import Newest from "./Newest";
import Gallery from "./Gallery";
// const products: Product[] = [
//   {
//     id: "1",
//     name: "GoPro",
//     price: 57,
//     quantity: 0,
//     description:"mmdkjfjfjdf",
//     category:"teen"
  
//   },
//   {
//     id: "2",
//     name: "Tripod",
//     price: 7.99,
//     quantity: 0,
//     description:"mmdkjfjfjdf",
//     category:"men",
//   },
//   {
//     id: "3",
//     name: "Bag",
//     price: 4.99,
//     quantity: 0,
//     description:"mmdkjfjfjdf",
//     category:"women",

//   },
// ];

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      {/* <CartModal />  */}
      <Hero/>
      <Newest/>
      {/* <Gallery/> */}
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl">E-Commerce Cart System HB</h1>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          {/* <Cart /> */}
        </div>
      </main>
    </>
 
  );
}