import UserRepository from '@/app/db/repositories/UserRepository';

export async function GET() {
    // TODO: change to get own information
    const response = await UserRepository.getAll();
    return Response.json(response);
}
