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

export async function fetchTour(tourId) {
  if (!tourId) {
    throw new Error("Tour ID is required");
  }
  const tours = await sql`SELECT * FROM "Tour" WHERE id = ${tourId}`;
  if (tours.length === 0) {
    throw new Error(`Tour with ID ${tourId} not found`);
  }

  const tour = tours[0];

  // Parse extendedDetails if it's a string
  if (tour.extended_details && typeof tour.extended_details === "string") {
    try {
      tour.extended_details = JSON.parse(tour.extended_details);
    } catch (e) {
      console.error("Failed to parse extendedDetails:", e);
    }
  }

  return tour;
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

export async function updateTour(tourId) {
  if (!tourId) {
    throw new Error("Tour ID is required");
  }

  // Only decrease if availableSeats > 0
  await sql`
    UPDATE "Tour" 
    SET "availableSeats" = CASE 
      WHEN "availableSeats" > 0 THEN "availableSeats" - 1 
      ELSE "availableSeats" 
    END
    WHERE id = ${tourId}
  `;
}

async function main() {
  // await createTours(tourData);
}

main();
