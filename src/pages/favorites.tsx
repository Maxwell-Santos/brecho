import { Product } from "@/components/Product"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import useSwr from 'swr'
import ProductProps from "@/interfaces/ProductStockProps";
import { Dashboard } from "@/components/Dashboard"



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Favorites() {

  const { data: session } = useSession()
  const email = session?.user?.email

  const { data, error, isLoading } = useSwr(`/api/getFavoriteProducts/${email}`, fetcher)

  if (error) return <div>Não foi possível carregar os produtos favoritos</div>
  if (isLoading) return <div>Carregando...</div>
  if (!data) return null

  return (
    <>
      <Head>
        <title>Favoritos</title>
      </Head>

      <Dashboard />

      <section className=" h-full">

        <h1 className="text-3xl text-title font-bold my-7 uppercase">Meus favoritos</h1>

        {data.length > 0 ? (

          <div className="flex justify-center">

            {
              data.map((product: ProductProps) => (
                <Product
                  key={product._id + '-favorites'}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  quant={product.quant}
                  _id={product._id}
                />
              ))
            }
          </div>
        ) : (
          <div className="text-center mt-32">
            <span>Você ainda não adicionou nenhum favorito</span>
            <Link
              href="/products"
              className="bg-btn-primary block mx-auto w-fit text-white p-3 px-7 hover:-translate-y-1 transition-all text-center mt-10"
            >
              Adicionar
            </Link>
          </div>
        )
        }
      </section>
    </>
  )
}