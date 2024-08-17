import { NextResponse } from "next/server";

const users = [
  {
    id: "1",
    name: "Gilang",
    email: "gilanglibna@gmail.com",
    username: "gilang",
    password: "123",
  },
  {
    id: "2",
    name: "Miko",
    email: "aryagilng@gmail.com",
    username: "Miko",
    password: "123",
  },
];

export async function GET(request) {
  return NextResponse.json(users);
}
