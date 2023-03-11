import { Dashboard } from "@/components/Dashboard";
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
    </>
  )
}
