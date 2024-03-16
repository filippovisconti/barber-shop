import AppointmentRepository from '@/app/db/repositories/AppointmentRepository'

export async function GET() {
    const response = await AppointmentRepository.getAppointmentsJoin()
    return Response.json(response)
}
