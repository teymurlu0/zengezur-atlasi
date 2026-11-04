import { NextResponse } from "next/server";

// Zəngilan ətrafındakı konkret 1 terrain tile. Zoom 10, x=644, y=391.
// Mapzen/Terrain Tiles yüksəklik məlumatları; bu, 5 rayonun bütöv xəritəsi deyil.
const TILE_URL =
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/10/644/391.png";

export async function GET() {
  try {
    const response = await fetch(TILE_URL, {
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error(`Terrain service: ${response.status}`);
    const bytes = await response.arrayBuffer();
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Terrain tile unavailable:", error);
    return NextResponse.json(
      { error: "Terrain tile could not be loaded" },
      { status: 502 }
    );
  }
}
