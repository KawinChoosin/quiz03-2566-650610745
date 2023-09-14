import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  let roomId = null;
  let roomName = null;
  try {
    const payload = checkToken;
    roomId = payload.roomId;
    roomName: payload.roomName;
  } catch {
    if (DB.roomId != roomId)
      return NextResponse.json(
        {
          ok: false,
          message: `Room is not found`,
        },
        { status: 404 }
      );
  }

  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: DB.rooms.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  readDB();
  let role = null;
  const messageId = nanoid();
  try {
    roomId = payload.roomId;
    roomName: payload.roomName;
    role = payload.role;
  } catch {
    if (role != "ADMIN" || role != "SUPER_ADMIN")
      return NextResponse.json(
        {
          ok: false,
          message: `Invalid token`,
        },
        { status: 401 }
      );
  }
  const foundroom = DB.rooms.find((x) => x.roomName === roomName);

  readDB();
  if (foundroom)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );
  try {
    DB.rooms.push({
      roomId: messageId,
      roomName: roomName,
    });
  } catch {}
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${roomName} has been created`,
  });
};
