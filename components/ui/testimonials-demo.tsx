"use client";

import { TestimonialSection } from "@/components/ui/testimonials";
import { clientResultsData } from "@/lib/client-results";

export default function TestimonialSectionDemo() {
  return (
    <TestimonialSection
      title="Real men. Real change."
      subtitle="Hover a card to watch the transformation."
      testimonials={clientResultsData}
    />
  );
}
