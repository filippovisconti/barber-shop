import { type NextRequest } from 'next/server';
import AppointmentRepository from '@/app/db/repositories/AppointmentRepository';
import { NewAppointment } from '@/app/db/schema';

function addHoursAndMinutes(date: string | Date, hours: number, minutes: number): Date {
    const dateCopy = new Date(date);
    dateCopy.setHours(dateCopy.getHours() + hours);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    return dateCopy;
}

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const service = data.get('service')?.toString();
    const location = data.get('location')?.toString();
    const raw_date = data.get('date')?.toString();
    const time = data.get('time')?.toString();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const notes = data.get('notes')?.toString();
    if (!service || !location || !raw_date || !time || !name || !email) {
        if (!service) console.log('service is missing');
        if (!location) console.log('location is missing');
        if (!raw_date) console.log('date is missing');
        if (!time) console.log('time is missing');
        if (!name) console.log('name is missing');
        if (!email) console.log('email is missing');

        return Response.json({ error: 'invalid form data' }, { status: 400 });
    }
    const date = addHoursAndMinutes(raw_date, 1, 0);
    const time_parts = time.split(':');
    if (time_parts.length !== 2, date < new Date()) {
        if (time_parts.length !== 2) console.log('time is invalid');
        if (date < new Date()) console.log('date is invalid');
        return Response.json({ error: 'invalid form data' }, { status: 400 });
    }

    const appointment: NewAppointment = {
        serviceId: service,
        locationId: location,
        date: addHoursAndMinutes(date, parseInt(time_parts[0]), parseInt(time_parts[1])),
        userEmail: email,
        status: 'confirmed',
        notes: notes,
    };
    try {
        const { id: new_appointment_id } = (await AppointmentRepository.insert(appointment))[0];
        console.log(appointment, new_appointment_id);
        return Response.json({ id: new_appointment_id });
    } catch (error) {
        console.error('[error] failed creating appointment', error);
        return Response.json({ error: 'failed, no appointmnet created' }, { status: 400 });
    }
}
