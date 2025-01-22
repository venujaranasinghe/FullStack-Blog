import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../../Components/Loading";
import { useEffect } from "react";
import { MdOutlineAccountCircle, MdSettingsSuggest } from "react-icons/md";



export default function Setting() {

    const { data: session, status } = useSession();

    const router = useRouter();
    // check if there's no active session and redirect to login page
    useEffect(() => {
        // check if there's no active session and redirect to login page
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

    async function logout() {
        await signOut();
        await router.push('/login');
    }

    if (session) {
        return <>

            <div className="settingpage">
                {/* title admin settings*/}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Admin <span>Settings</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdSettingsSuggest /> <span>/</span> <span>Settings</span>
                    </div>

                    <div className="profilesettings" data-aos="fade-up">
                        <div className="leftprofile_details flex">
                            <img src="/img/profile.jpeg" alt="coder" />
                            <div className="w-100">
                                <div className="flex flex-sb flex-left mt-2">
                                    <h2>My Profile:</h2>
                                    <h3>Venuja Ranasinghe <br /> Computer Science Undergraduate</h3>
                                </div>
                                <div className="flex flex-sb mt-2">
                                    <h3>Contact</h3>
                                    {/* you can change here as you want */}
                                    <input type="text" defaultValue="+94-123456789" />
                                </div>
                                <div className="mt-2">
                                    <input type="email" defaultValue="venuja12345@gmail.com" />
                                </div>
                                <div className="flex flex-center w-100 mt-2">
                                    <button>
                                        Save
                                    </button>
                                </div>
                                <div className="rightlogoutsec">
                                    <div className="topaccountbox">
                                        <h2 className="flex flex-sb">My Account <MdOutlineAccountCircle /></h2>
                                        <hr />
                                        <div className="flex flex-sb mt-1">
                                            <h3>Active Account <br />Email</h3>
                                            <button onClick={logout}>Log Out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    }
}