import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import DoctorIntroVideo from "@/components/sections/DoctorIntroVideo";
import StatsBar from "@/components/sections/StatsBar";
import KeySurgeries from "@/components/sections/KeySurgeries";
import KeyTreatments from "@/components/sections/KeyTreatments";
import WhyChooseDoctor from "@/components/sections/WhyChooseDoctor";
import PatientJourney from "@/components/sections/PatientJourney";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import HomeFAQ from "@/components/sections/HomeFAQ";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        secondaryCta={{
          label: { ar: "استكشف خدماتنا", en: "Explore Our Services" },
          href: "/services",
          icon: "services",
        }}
      />

      {/* Animated Stats Bar — right under the hero */}
      <StatsBar />

      {/* 2. Doctor Intro Video */}
      <DoctorIntroVideo />

      {/* 4. Key Surgeries */}
      <KeySurgeries />

      {/* 5. Key Treatments */}
      <KeyTreatments />

      {/* 6. Why Dr. Mahmoud Hassan? */}
      <WhyChooseDoctor />

      {/* 7. Patient Journey */}
      <PatientJourney />

      {/* 8. Patient Reviews Slider */}
      <ReviewsSlider />

      {/* 9. Featured Videos */}
      <FeaturedVideos />

      {/* 10. Frequently Asked Questions */}
      <HomeFAQ />

      {/* 11. Bottom CTA */}
      <FooterCTA />
    </>
  );
}
