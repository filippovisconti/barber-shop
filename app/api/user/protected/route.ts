import UserRepository from '@/app/db/repositories/UserRepository'
import { User } from '@/app/db/schema'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const queriedName = searchParams.get('name')
    const queriedUuid = searchParams.get('uuid')

    if (queriedName) {
        const foundUser: User[] = await UserRepository.getByField('name', queriedName)
        return Response.json(foundUser[0].id)
    }

    if (queriedUuid) {
        const foundUser: User = await UserRepository.getById(queriedUuid)
        return Response.json(foundUser)
    }
    // query is "hello" for /api/search?query=hello
}
