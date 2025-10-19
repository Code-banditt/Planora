import AllPros from "@/Controller/getALLPros";

export async function GET(req: Request) {
  return AllPros(req);
}
