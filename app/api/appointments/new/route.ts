import AppointmentRepository from '@/app/db/repositories/AppointmentRepository'
import { NewAppointment } from '@/app/db/schema'
import { type NextRequest } from 'next/server'

function addHoursAndMinutes(date: string | Date, hours: number, minutes: number): Date {
    const dateCopy = new Date(date)
    dateCopy.setHours(dateCopy.getHours() + hours)
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes)
    return dateCopy
}

export async function POST(request: NextRequest) {
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
    const date = addHoursAndMinutes(rawDate, 1, 0)
    const timeParts = time.split(':')
    if ((timeParts.length !== 2, date < new Date())) {
        if (timeParts.length !== 2) console.log('time is invalid')
        if (date < new Date()) console.log('date is invalid')
        return Response.json({ error: 'invalid form data' }, { status: 400 })
    }

    const appointment: NewAppointment = {
        serviceId: service,
        locationId: location,
        date: addHoursAndMinutes(date, parseInt(timeParts[0], 10), parseInt(timeParts[1], 10)),
        userEmail: email,
        status: 'confirmed',
        notes,
    }
    try {
        const { id: newAppointmentId } = (await AppointmentRepository.insert(appointment))[0]
        return Response.json({ id: newAppointmentId })
    } catch (error) {
        return Response.json({ error: 'failed, no appointmnet created' }, { status: 400 })
    }
}
