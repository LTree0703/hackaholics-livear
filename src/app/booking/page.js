"use server";

import React from "react";
import { sql } from "../../lib/server.js";
import { createUsers, deleteUser } from "../../lib/user.js";
import { createTours, deleteTour } from "../../lib/tour.js";
import { createBookings, deleteBooking } from "../../lib/booking.js";

// server action: create a single user
async function createUserAction(formData) {
  "use server";
  const email = String(formData.get("email") || "");
  if (!email) return;
  await createUsers([{ email }]);
}

// server action: create a tour
async function createTourAction(formData) {
  "use server";
  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const price = parseFloat(formData.get("price") || "0");
  const timeRaw = String(formData.get("time") || "");
  const time = timeRaw ? new Date(timeRaw) : null;
  const quota = parseInt(formData.get("quota") || "0", 10);
  const duration = parseFloat(formData.get("duration") || "0");
  const startLocation = String(formData.get("startLocation") || "");
  const endLocation = String(formData.get("endLocation") || "");
  await createTours([
    {
      name,
      description,
      price,
      time,
      quota,
      duration,
      startLocation,
      endLocation,
    },
  ]);
}

// server action: create a booking
async function createBookingAction(formData) {
  "use server";
  const userId = String(formData.get("userId") || "");
  const tourId = String(formData.get("tourId") || "");
  const numPeople = parseInt(formData.get("numPeople") || "1", 10);
  if (!userId || !tourId) return;
  await createBookings([{ userId, tourId, numPeople }]);
}

// server action: delete user
async function deleteUserAction(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteUser(id);
}

// server action: delete tour
async function deleteTourAction(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteTour(id);
}

// server action: delete booking (use direct SQL to avoid adding new file changes)
async function deleteBookingAction(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteBooking(id);
}

export default async function Page() {
  // fetch data on the server
  const users = await sql`SELECT * FROM "User"`; // safe fallback if created_at doesn't exist
  const tours = await sql`SELECT * FROM "Tour" ORDER BY name`;
  const bookings =
    await sql`SELECT * FROM "Booking" ORDER BY "createdAt" DESC NULLS LAST, id`;

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Bookings Admin</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Users</h2>
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ marginBottom: 6 }}>
              {u.email}{" "}
              <form
                action={deleteUserAction}
                method="post"
                style={{ display: "inline" }}
              >
                <input type="hidden" name="id" value={u.id} />
                <button type="submit">Delete</button>
              </form>
            </li>
          ))}
        </ul>

        <form action={createUserAction} method="post" style={{ marginTop: 8 }}>
          <input name="email" placeholder="email" required />
          <button type="submit" style={{ marginLeft: 8 }}>
            Create User
          </button>
        </form>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Tours</h2>
        <ul>
          {tours.map((t) => (
            <li key={t.id} style={{ marginBottom: 6 }}>
              {t.name} — {t.description} — ${t.price}
              <form
                action={deleteTourAction}
                method="post"
                style={{ display: "inline", marginLeft: 8 }}
              >
                <input type="hidden" name="id" value={t.id} />
                <button type="submit">Delete</button>
              </form>
            </li>
          ))}
        </ul>

        <form
          action={createTourAction}
          method="post"
          style={{ marginTop: 8, display: "grid", gap: 6, maxWidth: 520 }}
        >
          <input name="name" placeholder="name" required />
          <input name="description" placeholder="description" />
          <input name="price" placeholder="price" type="number" step="0.01" />
          <input name="time" placeholder="time" type="datetime-local" />
          <input name="quota" placeholder="quota" type="number" />
          <input
            name="duration"
            placeholder="duration (hours)"
            type="number"
            step="0.1"
          />
          <input name="startLocation" placeholder="startLocation" />
          <input name="endLocation" placeholder="endLocation" />
          <button type="submit">Create Tour</button>
        </form>
      </section>

      <section>
        <h2>Bookings</h2>
        <ul>
          {bookings.map((b) => (
            <li key={b.id} style={{ marginBottom: 6 }}>
              user: {b.userId} — tour: {b.tourId} — people:{" "}
              {b.numpeople ?? b.numPeople ?? b.num_people}
              <form
                action={deleteBookingAction}
                method="post"
                style={{ display: "inline", marginLeft: 8 }}
              >
                <input type="hidden" name="id" value={b.id} />
                <button type="submit">Delete</button>
              </form>
            </li>
          ))}
        </ul>

        <form
          action={createBookingAction}
          method="post"
          style={{
            marginTop: 8,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <select name="userId" required>
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>

          <select name="tourId" required>
            <option value="">Select tour</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <input
            name="numPeople"
            placeholder="# people"
            type="number"
            defaultValue={1}
            min={1}
          />
          <button type="submit">Create Booking</button>
        </form>
      </section>
    </div>
  );
}
