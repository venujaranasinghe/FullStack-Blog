import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../../../Components/Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import { MdPendingActions } from "react-icons/md";
import axios from "axios";
import Blog from "../../../../Components/Blog";

export default function DeleteBlog() {

    // login first 
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

    // blog edit
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {

        if (!id) {
            return;
        } else {
            axios.get('/api/blogapi?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }

    }, [id])

    // cancel the delet blog and go back to home
    function goback() {
        router.push('/');
    }

    // delete one blog only with this function
    async function deleteOneblog() {
        await axios.delete(`/api/blogapi?id=${id}`);

        goback()
    }


    if (session) {
        return <>

            <Head>
                <title>Update Blog</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Delete <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <MdPendingActions /> <span>/</span> <span>Edit Blogs</span>
                    </div>
                </div>

                <div className="deletesec flex flex-center wh_100">
                    <div className="deletecard">
                        <svg viewBox="0 0 24 24" fill="red" height="6em" width="6em">
                            <path d="M4 19V11h12v2c1.1-1.1 2-2 2-2-2-2-2-2-2-2H8V7h12v12H8v-4H4v4H2v-6h2v6Z" />
                        </svg>

                        <p className="cookieHeading">Are you sure?</p>
                        <p className="cookieDescription">If you delete this blog content it will be permenently deleted.</p>
                    </div>

                    <div className="buttonContainer">
                       <button onClick={deleteOneblog} className="acceptButton">Delete</button> 
                       <button onClick={goback} className="declineButton">Cancel</button> 
                    </div>
                </div>
            </div>
        </>
    }

}