import { type NextRequest } from 'next/server';
import AppointmentRepository from '@/app/db/repositories/AppointmentRepository';
import { NewAppointment } from '@/app/db/schema';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const service = data.get('service')?.toString();
    const location = data.get('location')?.toString();
    const raw_date = data.get('date')?.toString();
    const time = data.get('time')?.toString();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    if (!service || !location || !raw_date || !time || !name || !email) {
        if (!service) console.log('service is missing');
        if (!location) console.log('location is missing');
        if (!raw_date) console.log('date is missing');
        if (!time) console.log('time is missing');
        if (!name) console.log('name is missing');
        if (!email) console.log('email is missing');

        return Response.json('invalid form data');
    }
    const date = new Date(raw_date);

    const appointment: NewAppointment = {
        serviceId: service,
        locationId: location,
        date: new Date(date),
        userId: name,
    };
    try {
        await AppointmentRepository.insert(appointment);
    } catch (error) {
        console.error('[error] failed creating appointment', error);
        return Response.json({ error: 'failed, no appointmnet created' }, { status: 400 });
    }
    return Response.json('appointment created');
}
