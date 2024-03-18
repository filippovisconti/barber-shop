import ServiceRepository from '@/app/db/repositories/ServiceRepository'
import { Service } from '@/app/db/schema'
import { NextRequest } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api get is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api get is required' }, { status: 400 })
    const response = await ServiceRepository.getById(params.id)
    return Response.json(response)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api delete is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api delete is required' }, { status: 400 })
    const response = await ServiceRepository.delete(params.id)
    return Response.json(response)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api update is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api update is required' }, { status: 400 })

    const data = await request.formData()
    const name = data.get('name')?.toString()
    const description = data.get('description')?.toString()
    const price = data.get('price')?.toString()
    const duration = data.get('duration')?.toString()

    if (!name || !description || !price || !duration) {
        let error: string = ''
        if (!name) error += 'name is missing'
        if (!description) error += 'description is missing'
        if (!price) error += 'price is missing'
        if (!duration) error += 'duration is missing'
        console.log('error', error)
        return Response.json({ error: `invalid form data: ${error}` }, { status: 400 })
    }

    const editedService: Service = {
        id: params.id,
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10),
    }

    try {
        await ServiceRepository.updateById(params.id, editedService)
        return Response.json({ id: params.id })
    } catch (error) {
        return Response.json({ error: 'failed, no service updated' }, { status: 400 })
    }
}
