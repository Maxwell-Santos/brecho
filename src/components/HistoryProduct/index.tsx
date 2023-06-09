import ProductProps from "@/interfaces/ProductToBuyProps"
import { moneyFormat } from "@/utils/MoneyFormat"
import Link from "next/link"

export function HistoryProduct({ name, price, quantity, _id }: ProductProps) {

  return (
    <Link
      href={`/products/${_id}`}
      className="p-4 border-t first:border-none border-gray-300 flex flex-col justify-center hover:bg-history-item/10 transition-all"
    >
      <h3 className="text-title font-semibold text-2xl uppercase">{name}</h3>

      <div>
        <span className="text-lg block">{moneyFormat(price)}</span>
        <span>Quantidade: {quantity}</span>
      </div>

    </Link>
  )
}
