import { Suspense } from "react";
import Navbar from "@/layouts/navbar/Navbar";
import Footer from "@/layouts/footer/Footer";
import ScrollProgress from "@/components/scroll-progress/ScrollProgress";

const AppLayout = ({ children }) => {
  return (
    <>
      <a href="#main" className="skip-link">
        main
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;
