import ProductProps from "@/interfaces/ProductStockProps"
import Link from "next/link"
import { Actions } from "./Actions"

export function Product({ name, description, price, quant, _id }: ProductProps) {

  const productId = _id

  return (
    <div
      id="product-card"
      className="m-3 flex flex-col relative group overflow-hidden"
    >

      <Actions />

      <Link
        href="/products/[productId]"
        as={`/products/${productId}`}
      >
        <div className="w-full h-[360px] max-w-[350px] bg-gray-200">
          <img src="https://images.unsplash.com/photo-1565462905097-5e701c31dcfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
        </div>
      </Link>

      <div className="bg-primary flex justify-between pt-2">
        <h3 className="text-title font-semibold uppercase text-center">{name}</h3>
        <span className="text-md text">{price}</span>
      </div>

    </div>
  )
}