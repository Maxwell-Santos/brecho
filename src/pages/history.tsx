import { useSession } from "next-auth/react"

export default function History() {
  const { data: session } = useSession()
  
  return (
   <>
   </>
 )
}
