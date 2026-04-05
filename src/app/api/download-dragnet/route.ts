import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://mdv1bzkkj9z23omg.public.blob.vercel-storage.com/DRAGNET_studypack_updated.pdf";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch the resource");

    const blob = await response.blob();
    
    // Create new headers with Content-Disposition to force download
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", 'attachment; filename="DRAGNET_studypack_updated.pdf"');

    return new NextResponse(blob, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
