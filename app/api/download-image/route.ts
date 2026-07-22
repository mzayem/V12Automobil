import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing url", { status: 400 });
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response("Failed to fetch image", { status: 500 });
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";

  return new Response(response.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": 'attachment; filename="vehicle.jpg"',
    },
  });
}
