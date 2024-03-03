import LocationRepository from '@/app/db/repositories/LocationRepository'

export async function GET() {
    try {
        const response = await LocationRepository.getAll()
        return Response.json(response)
    } catch (error) {
        throw new Error('error getting locations')
    }
}
