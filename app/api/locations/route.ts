import LocationRepository from "@/app/db/repositories/LocationRepository";

export async function GET() {
    const response = await LocationRepository.getAll();
    return Response.json(response)
}
