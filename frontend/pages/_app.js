import Aos from "@/Components/Aos";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import ScrollToTopBtn from "@/Components/ScrollToTopBtn";
import TopLoadingLine from "@/Components/TopLoadingLine";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
  <Header />
    <main>
      <TopLoadingLine />
      <Aos>
      <Component {...pageProps} />
      </Aos>
      <ScrollToTopBtn />
    </main>
    <Footer />
  </>
}
