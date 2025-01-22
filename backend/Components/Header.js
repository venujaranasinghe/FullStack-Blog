import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { GoScreenFull } from "react-icons/go";
import { GoScreenNormal } from "react-icons/go";
import { useState } from "react";
import { useSession } from "next-auth/react";



export default function Header() {

    const { data: session } = useSession();
    const [isFullscreen, setisFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setisFullscreen(true);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setisFullscreen(false);
                });
            }
        }
    }

    return <>
        <header className="header flex felx-sb">
            <div className="logo flex gap-2">
                <h1>ADMIN PANEL</h1>
                <div className="headerham flex flex-center">
                    <HiOutlineBars3BottomLeft />
                </div>
            </div>
            <div className="rightnav flex gap-2">
                <div onClick={toggleFullscreen}>
                    {isFullscreen ? <GoScreenNormal /> : <GoScreenFull />}
                </div>
                <div className="notification">
                    <img
                        src="https://img.icons8.com/?size=100&id=62atSgaif9UE&format=png&color=000000"
                        alt="noti"
                    />
                </div>
                <div className="profilenav">
                    {session ? (
                        <img
                            width={100}
                            height={50}
                            src={session.user.image}
                            alt="User profile"
                        />
                    ) : (
                        <img
                            width={50}
                            height={50}
                            src="https://img.icons8.com/?size=100&id=98957&format=png&color=000000"
                            alt="Default user"
                        />
                    )}
                </div>

            </div>
        </header>

    </>
}