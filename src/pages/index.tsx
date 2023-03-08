import { Dashboard } from '@/components/Dashboard';
import { FormNewProduct } from '@/components/FormNewProduct';
import { Products } from '@/components/Products';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>Brechó Online</title>
        <meta name="description" content="E-commerce brechó online " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='min-h-screen w-full'>
        <Dashboard />
        <Products />
        <FormNewProduct />
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if(!session){
    return {
      redirect: {
        destination: "/login"
      }
    }
  }

  return {
    props: {session},
  }
}