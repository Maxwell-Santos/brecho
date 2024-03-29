import ProductProps from "@/interfaces/ProductStockProps"
import { moneyFormat } from "@/utils/MoneyFormat"
import Link from "next/link"
import { Actions } from "./Actions"

export function Product({ name, description, price, quant, _id }: ProductProps) {

  const productId = _id
  // const isFavorite = favorites.some(favoriteProduct => favoriteProduct._id == productId)
  
  return (
    <div
      id="product-card"
      className="m-3 flex flex-col relative group overflow-hidden"
    >

      <Actions productId={productId} />

      <Link
        href="/products/[productId]"
        as={`/products/${productId}`}
      >
        <div className="w-full h-[360px] max-w-[350px] bg-gray-200">
          <img src="https://img.ltwebstatic.com/images3_pi/2022/09/16/16633243588318a4c7001d21e52484b56606ca2a88_thumbnail_600x.webp" alt="imagem do produto" />
        </div>
      </Link>

      <div className="bg-primary flex justify-between pt-2">
        <h3 className="text-title font-semibold uppercase text-start truncate w-full max-w-[12rem]" title={name}>{name}</h3>
        <span className="text-md text" title={moneyFormat(price)}>{moneyFormat(price)}</span>
      </div>
    </div>
  )
}