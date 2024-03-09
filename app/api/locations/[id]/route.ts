import LocationRepository from '@/app/db/repositories/LocationRepository'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api get is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api get is required' }, { status: 400 })
    const response = await LocationRepository.getById(params.id)
    return Response.json(response)
}
