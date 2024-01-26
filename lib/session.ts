//server-side get-user
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export async function getCurrentUser() {
  const session = await getServerSession(options);
  return session?.user;
}
