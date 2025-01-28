export async function GET() {
  return new Response(JSON.stringify({
    BACKEND_URL: process.env.BACKEND_URL
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}