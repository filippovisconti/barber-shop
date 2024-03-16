import AppointmentRepository from '@/app/db/repositories/AppointmentRepository'
import { Appointment } from '@/app/db/schema'
import { NextRequest } from 'next/server'

function addHoursAndMinutes(date: string | Date, hours: number, minutes: number): Date {
    const dateCopy = new Date(date)
    dateCopy.setHours(dateCopy.getHours() + hours)
    dateCopy.setMinutes(minutes, 0, 0)
    console.log('date', dateCopy)
    return dateCopy
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api get is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api get is required' }, { status: 400 })
    const response = await AppointmentRepository.getById(params.id)
    return Response.json(response)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api delete is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api delete is required' }, { status: 400 })
    const response = await AppointmentRepository.delete(params.id)
    return Response.json(response)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    if (!params.id) return Response.json({ error: 'id in api update is required' }, { status: 400 })
    if (params.id === undefined)
        return Response.json({ error: 'id in api update is required' }, { status: 400 })
    const data = await request.formData()
    const service = data.get('service')?.toString()
    const location = data.get('location')?.toString()
    const rawDate = data.get('date')?.toString()
    const time = data.get('time')?.toString()
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()
    const notes = data.get('notes')?.toString()
    if (!service || !location || !rawDate || !time || !name || !email) {
        let error: string = ''
        if (!service) error += 'service is missing'
        if (!location) error += 'location is missing'
        if (!rawDate) error += 'date is missing'
        if (!time) error += 'time is missing'
        if (!name) error += 'name is missing'
        if (!email) error += 'email is missing'

        return Response.json({ error: `invalid form data: ${error}` }, { status: 400 })
    }
    console.log('here', rawDate)
    const date = new Date(rawDate)
    date.setHours(0, 0, 0, 0)

    const timeParts = time.split(':')
    if ((timeParts.length !== 2, date < new Date())) {
        if (timeParts.length !== 2) console.log('time is invalid')
        if (date < new Date()) console.log('date is invalid')
        return Response.json({ error: 'invalid form data' }, { status: 200 })
    }
    console.log('here', date, timeParts)
    const appointment: Appointment = {
        id: params.id,
        serviceId: service,
        locationId: location,
        date: addHoursAndMinutes(date, parseInt(timeParts[0], 10), parseInt(timeParts[1], 10)),
        createdAt: new Date(),
        userEmail: email,
        status: 'confirmed',
        notes: notes ?? '',
    }
    console.log(appointment)
    try {
        const { id: newAppointmentId } = (
            await AppointmentRepository.updateById(params.id, appointment)
        )[0]
        return Response.json({ id: newAppointmentId })
    } catch (error) {
        return Response.json({ error: 'failed, no appointmnet created' }, { status: 400 })
    }
}
