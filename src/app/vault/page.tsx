import prisma from '@/lib/prisma'

export default async function Login() {
  const users = await prisma.user.findMany()
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ol className="list-decimal list-inside text-lg">
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-primary">
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  )
}
