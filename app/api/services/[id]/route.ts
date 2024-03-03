import ServiceRepository from '@/app/db/repositories/ServiceRepository'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    if (!params.id)
        return Response.json(
            { error: 'id in api get is required' },
            { status: 400 }
        )
    if (params.id === undefined)
        return Response.json(
            { error: 'id in api get is required' },
            { status: 400 }
        )
    const response = await ServiceRepository.getById(params.id)
    return Response.json(response)
}
