import "@/styles/globals.css";
import Header from "../../Components/Header";
import Aside from "../../Components/Aside";
import { SessionProvider } from "next-auth/react"
import { useState } from "react";
import Loading from "../../Components/Loading";
import Aos from "../../Components/Aos";

export default function App({ Component, pageProps: { session, ...pageProps } }) {


  const [loading, setLoading] = useState(false);


  return <>
    <SessionProvider session={session}>

      {loading ? (
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <Header />
          <Aside />
          <main>
            <Aos>
              <Component {...pageProps} />
            </Aos>
          </main>
        </>
      )}

    </SessionProvider>
  </>
}
