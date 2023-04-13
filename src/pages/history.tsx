import { Dashboard } from "@/components/Dashboard"
import { HistoryProduct } from "@/components/HistoryProduct"
import ProductProps from "@/interfaces/ProductToBuyProps"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UserDataProps {
  date: string;
  cart: {
    date: string,
    items: ProductProps[],
    total: number
  }[];
  total: number;
}

export default function History() {

  const { data: session } = useSession()
  const userEmail = session?.user?.email
  const { data, error, isLoading } = useSwr(`/api/getUserHistory/${userEmail}`, fetcher)
  const userData: UserDataProps = data

  const priceF = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  const history = userData?.cart?.map(buy => (
    <div className="mb-10 flex flex-col p-5 w-full">
      <span className="text-gray-500 text-lg -translate-x-5 -translate-y-5 font-bold">{buy.date}</span>
      {
        buy.items.map(product => (
          <HistoryProduct
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            _id={product._id}
          />
        ))
      }
      <span className="py-2 uppercase">TOTAL da compra: {priceF.format(buy.total)}</span>
    </div>
  ))

  if (error) return <div>Não foi possível carregar o usuário</div>
  if (isLoading) return <div>Carregando...</div>
  if (!data) return null

  return (
    <>
      <Head><title>Histórico</title></Head>

      <Dashboard />
      <section>

        <h1 className="text-3xl text-title font-bold my-7 uppercase">
          Histórico
        </h1>
        <div className="max-w-[900px] mx-auto flex flex-col-reverse">
          {history}

        </div>
        <Link
          href="/products"
          className="bg-btn-primary block mx-auto w-fit text-white p-3 px-7 hover:-translate-y-1 transition-all text-center"
        >
          Comprar agora
        </Link>
      </section>
    </>
  )
}
