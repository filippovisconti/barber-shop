import UserRepository from '@/app/db/repositories/UserRepository'
import { User } from '@/app/db/schema'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const queried_name = searchParams.get('name')
    const queried_uuid = searchParams.get('uuid')

    if (queried_name) {
        const found_user: User[] = await UserRepository.getByField(
            'name',
            queried_name
        )
        return Response.json(found_user[0].id)
    }

    if (queried_uuid) {
        const found_user: User = await UserRepository.getById(queried_uuid)
        return Response.json(found_user)
    }
    // query is "hello" for /api/search?query=hello
}
