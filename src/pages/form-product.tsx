import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { FormNewProduct } from "@/components/FormNewProduct";
import Head from "next/head";

export default function FormProduct() {

  return (
    <>
    <Head>
      <title>Formulário - adicionar novo produto</title>
    </Head>
      <Dashboard />
      <section>
        <FormNewProduct />
      </section>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Footer />
      </div>
    </>
  )
}
