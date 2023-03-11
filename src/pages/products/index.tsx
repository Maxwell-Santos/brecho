import { Dashboard } from "@/components/Dashboard";
import { Product } from "@/components/Product";
import ProductProps from "@/interfaces/ProductProps";
import Head from "next/head";
import { useMemo, useState } from "react";

export default function ProductsPage(props: any) {
  const productsParsed: ProductProps[] = JSON.parse(props.products)

  //filtro de produtos
  const [query, setQuery] = useState("")

  const filterProduct = useMemo(() => {
    return productsParsed.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Dashboard />

      <input
        className="border-b border-[#34BE82] rounded-sm p-2 mx-auto block mt-4 outline-none text-3xl uppercase font-extralight placeholder:lowercase placeholder:text-xl bg-transparent"
        type="text"
        name="search"
        id="search"
        value={query}
        placeholder="ex: camisa"
        spellCheck="false"
        onChange={e => setQuery(e.target.value)}
      />
      <section className="p-5 grid gap-3 md:grid-cols-3 lg:grid-cols-4 place-content-center">
        {
          productsParsed ? (
            <>
              {
                filterProduct.length != 0 ? (
                  filterProduct.map((product: ProductProps, index: number) => (
                    <Product
                      key={index}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      quant={product.quant}
                      _id={product._id}
                    />
                  ))
                ) : (
                  <>
                  <div className="w-full text-center">
                    <p>Não foi encontrado o seu produto</p>
                  </div>
                  </>
                )
              }
            </>
          ) : <span>carregando</span>
        }
      </section>
    </>
  )
}

export async function getServerSideProps() {

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getProducts`)

  const parseJson = await response.json()

  const products = JSON.stringify(parseJson)

  return {
    props: {
      products: products
    }
  }
}