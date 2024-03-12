import ServiceRepository from '@/app/db/repositories/ServiceRepository'
import { NewService } from '@/app/db/schema'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
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

    const newService: NewService = {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10),
    }
    try {
        const { id: newServiceId } = (await ServiceRepository.insert(newService))[0]
        return Response.json({ id: newServiceId })
    } catch (error) {
        return Response.json({ error: 'failed, no service created' }, { status: 400 })
    }
}
