import { FloatingBookingButton } from "@/components/booking/FloatingBookingButton";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Collabs } from "@/components/Collabs";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InternalPortalCTA } from "@/components/InternalPortalCTA";
import { Location } from "@/components/Location";
import { Products } from "@/components/Products";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <BookingProvider>
      <main>
        <Hero />
        <Services />
        <Results />
        <Collabs />
        <Testimonials />
        <Products />
        <FinalCTA />
        <Location />
        <InternalPortalCTA />
        <Footer />
      </main>
      <FloatingBookingButton />
    </BookingProvider>
  );
}
