import ProductProps from "@/interfaces/ProductProps"
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
        className="w-full h-[320px] p-4 rounded-md shadow-sm m-3 flex flex-col justify-between hover:shadow-sm transition-all"
      >

        <h3 className="font-bold uppercase text-center">{name}</h3>
        <p>{description}</p>

        <div>
          <span className="text-lg">R${price}</span>
          {/* <span className="block mt-auto">estoque:{quant}</span> */}
        </div>

      </div>
    </Link>
  )
}