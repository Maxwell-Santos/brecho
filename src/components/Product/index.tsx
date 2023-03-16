import ProductProps from "@/interfaces/ProductStockProps"
import Link from "next/link"

export function Product({ name, description, price, quant, _id }: ProductProps) {

  const productId = _id

  return (
    <Link
      href="/products/[productId]"
      as={`/products/${productId}`}
    >
      <div
        id="product-card"
        className="w-full h-[360px] max-w-[330px] m-3 flex flex-col"
      >

        <div className="w-full h-full bg-gray-200">
        </div>

        <div className="bg-primary flex justify-between pt-2">
          <h3 className="text-title font-semibold uppercase text-center">{name}</h3>
          <span className="text-md text">{price}</span>
        </div>

      </div>
    </Link>
  )
}