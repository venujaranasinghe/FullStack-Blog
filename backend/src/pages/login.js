import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import Loading from "../../Components/Loading";

export default function Login(){

    const { data: session, status } = useSession();

    if (status === "loading") {
        // loading state, loader or any other indicator
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading />
            <h1>Loading...</h1>
        </div>
    }

    const router = useRouter();

    async function login(){
        await router.push('/');
        await signIn();
    }

    if (session) {
        router.push('/');
        return null; //return null or any loading indicator
    }

    // not session or not login then show this page for login
    if (!session) {
        return <>
    
    <div className="loginfront flex flex-center flex-col full-w">
        <Image src='/img/coder.jpeg' width={250} height={250} />
        <h1>Welcome to the Admin Panel of the LV Made It 👋</h1>
        <p>Visit my main website <a href="https://venujaranasinghe.github.io/portfolio-react/">LV Blogs</a></p>

        <button onClick={login} className='mt-2'>Login with google</button>
    </div>

    </>
    }
}