import AppointmentRepository from '@/app/db/repositories/AppointmentRepository';
import { NewAppointment } from '@/app/db/schema';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const service = data.get("service")?.toString();
    const location = data.get("location")?.toString();
    const raw_date = data.get("date")?.toString();
    const time = data.get("time")?.toString();
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    if (!service || !location || !raw_date || !time || !name || !email) {
        return Response.json('invalid form data');
    }
    const date = new Date(raw_date);

    const appointment: NewAppointment = { serviceId: service, locationId: location, date: new Date(date), userId: name };
    try {
        await AppointmentRepository.insert(appointment);
    } catch (error) {
        console.error('error creating appointment', error);
        return Response.json('error creating appointment');
    }
    console.log('appointment created');
    return Response.json('appointment created');
}
