export async function POST(_: Request, { params }: { params: { id: string } }) {
    console.log("hello");

    return Response.json({ hello: "world" });
}
