"use server";

import { sql } from "./server.js";
import { randomUUID } from "crypto";
import tourData from "./tourData.js";

export async function createTour(t) {
  const id = randomUUID();
  console.log("Generated ID:", id);

  const dateVal = t.date
    ? t.date instanceof Date
      ? t.date
      : new Date(t.date)
    : null;
  const extended = t.extendedDetails ? JSON.stringify(t.extendedDetails) : null;
  // ensure numeric fields
  const totalSeats =
    typeof t.totalSeats === "number"
      ? t.totalSeats
      : parseInt(t.totalSeats || "0", 10);
  const availableSeats =
    typeof t.availableSeats === "number"
      ? t.availableSeats
      : parseInt(t.availableSeats || "0", 10);
  const price =
    typeof t.price === "number" ? t.price : parseFloat(t.price || "0");

  await sql`
    INSERT INTO "Tour" (
      id,
      title,
      description,
      price,
      date,
      time,
      duration,
      "totalSeats",
      "availableSeats",
      "imageUrl",
      highlights,
      difficulty,
      weather,
      "extendedDetails"
    ) VALUES (
      ${id},
      ${t.title},
      ${t.description},
      ${price},
      ${dateVal},
      ${t.time},
      ${t.duration},
      ${totalSeats},
      ${availableSeats},
      ${t.imageUrl},
      ${t.highlights},
      ${t.difficulty},
      ${t.weather},
      ${extended}
    )`;
  return id;
}

export async function createTours(tourData) {
  for (const t of tourData) {
    await createTour(t);
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

async function main() {
  await createTours(tourData);
}

main();
