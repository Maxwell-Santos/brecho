import { Dashboard } from "@/components/Dashboard"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Product } from "@/components/Product"
import { ClientContext } from "@/contexts/clientContext"
import clienteProps from "@/interfaces/clientProviderProps"
import ProductProps from "@/interfaces/ProductStockProps"
import Head from "next/head"
import { useContext, useMemo, useState } from "react"

export default function ProductsPage(props: any) {
  const [query, setQuery] = useState("")
  const productsParsed: ProductProps[] = JSON.parse(props?.products)

  //filtro de produtos
  const filterProduct = useMemo(() => {
    return productsParsed?.filter(product => {
      return product.name.trim().toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  const { getFavorites }: clienteProps = useContext(ClientContext)

  // if (props?.products) getFavorites()

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Dashboard />
      <Hero />
      <input
        className="border border-[#497174] mx-auto rounded-sm p-2 px-5 block mt-10 mb-5 outline-none text-2xl uppercase font-extralight placeholder:lowercase placeholder:text-xl bg-transparent w-full max-w-[700px]"
        type="text"
        name="search"
        id="search"
        value={query}
        placeholder="ex: camisa"
        spellCheck="false"
        onChange={e => setQuery(e.target.value)}
      />
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-stretch">
        {
          productsParsed ? (
            <>
              {
                filterProduct.length != 0 ? (
                  filterProduct.map((product: ProductProps) => (
                    <Product
                      key={product._id + '-main'}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      quant={product.quant}
                      _id={product._id}
                    />
                  ))
                ) : (
                  <>
                    <div className="w-full min-h-[50vh] text-center">
                      <p>Não foi encontrado o seu produto</p>
                    </div>
                  </>
                )
              }
            </>
          ) : <span>carregando</span>
        }
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps() {

  const response = await fetch(`http://localhost:3000/api/getProducts`)

  const parseJson = await response.json()

  const products = JSON.stringify(parseJson)

  return {
    props: {
      products: products
    }
  }
}