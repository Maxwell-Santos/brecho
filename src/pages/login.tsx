import { LoginForm } from "@/components/Login"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Login() {
  const {status} = useSession()
  const router = useRouter()

  if(status == 'authenticated') router.push("/")

  return (
    <div className="mx-auto h-screen grid place-items-center bg-[url(/bg-login.jpg)] bg-no-repeat bg-cover bg-blend-darken">
      {
        status != 'authenticated' && <LoginForm />
      }
    </div>
  )
}