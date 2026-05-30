'use client';

import dynamic from "next/dynamic";

const SmokeCursor = dynamic(() => import("@/components/effects/SmokeCursor"), {
  ssr: false,
});

export default function ClientWrapper() {
  return (
    <SmokeCursor 
      smokeColor="#bebebe" 
      particleCount={200} 
      particleSize={1.5} 
      smokeOpacity={0.4} 
    />
  );
}
