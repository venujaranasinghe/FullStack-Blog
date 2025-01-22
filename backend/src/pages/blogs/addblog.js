import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../../../Components/Loading";
import { HiDocumentAdd } from "react-icons/hi";
import Blog from "../../../Components/Blog";

export default function Addblog() {

    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
    }, [session, router]);

    if (status === "loading") {
        // loading state, loader or any other indicator
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading />
            <h1>Loading...</h1>

        </div>
    }

    if (session) {
        return <>
            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Add <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <HiDocumentAdd /> <span>/</span> <span>Add Blogs</span>
                    </div>
                </div>

                <div className="blogsadd" data-aos="fade-up">
                    <Blog />
                </div>
            </div>
        </>
    }

}