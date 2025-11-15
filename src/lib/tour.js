"use server";

import { sql } from "./server.js";
import { createId } from "@paralleldrive/cuid2";

export async function createTours(tourData) {
  for (const t of tourData) {
    const id = createId();
    console.log("Generated ID:", id);
    await sql`INSERT INTO "Tour" (id, name, description, price, time, quota, duration, "startLocation", "endLocation") VALUES (${id}, ${t.name}, ${t.description}, ${t.price}, ${t.time}, ${t.quota}, ${t.duration}, ${t.startLocation}, ${t.endLocation})`;
  }
}

export async function fetchTours() {
  const tours = await sql`SELECT * FROM "Tour"`;
  console.log(tours);
  return tours;
}

export async function deleteTour(tourId) {
  console.log("Deleting tour with ID:", tourId);
  await sql`DELETE FROM "Tour" WHERE id = ${tourId}`;
}

// async function main() {
// const tourData = [
//   {
//     name: "City Tour",
//     description: "Explore the city highlights",
//     price: 99.99,
//     time: new Date("2024-12-15T10:00:00Z"),
//     quota: 20,
//     duration: 4,
//     startLocation: "Downtown",
//     endLocation: "Museum",
//   },
// ];
// }

// main();
