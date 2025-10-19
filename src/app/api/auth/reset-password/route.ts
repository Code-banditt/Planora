import Changepw from "@/Controller/resetPWController";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  return Changepw(req);
}
