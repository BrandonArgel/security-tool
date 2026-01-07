import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { CreateLoginFormCard } from '@/features/create-login-form/CreateLoginFormCard'
import { LoginList } from '@/features/login-list/LoginList'

export const dynamic = 'force-dynamic'

export default async function VaultPage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login?callbackUrl=/vault')
  }

  const logins = await prisma.savedLogin.findMany({
    where: {
      userId: session.user.id
    },
    select: {
      id: true,
      siteName: true,
      username: true,
      url: true
      // password: false <-- No la necesitamos todavía
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto p-6 space-y-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <CreateLoginFormCard />
        </div>

        <div>
          <LoginList logins={logins} />
        </div>
      </div>
    </div>
  )
}

// const users = await prisma.user.findMany()
//
// return (
//   <div className="flex flex-col items-center justify-center p-4">
//     <h1 className="text-2xl font-bold mb-4">Secret Vault</h1>
//     <CreateLoginFormCard />
//     {/* <ol className="list-decimal list-inside text-lg">
//       {users.map((user) => (
//         <li key={user.id} className="mb-2 text-primary">
//           {user.name || user.email}
//         </li>
//       ))}
//     </ol> */}
//   </div>
// )
