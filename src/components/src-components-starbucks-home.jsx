"use client";;
import { useState } from "react"

// ... (rest of the code remains the same)

export function StarbucksHomeJsx() {
  const [activeTab, setActiveTab] = useState("hot-coffees")

  return (
    (<div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      {/* ... (rest of the component code remains the same) */}
    </div>)
  );
}