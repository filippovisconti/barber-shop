import ServiceRepository from "@/app/db/repositories/ServiceRepository"

export async function GET() {
    const response = await ServiceRepository.getAll();
    return Response.json(response)
}
