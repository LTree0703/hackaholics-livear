"use client";

import DemoView from "../../components/demo/DemoView";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function DemoPage() {
  return (
    <ProtectedRoute>
      <DemoView />
    </ProtectedRoute>
  );
}
