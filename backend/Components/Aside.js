import Link from "next/link";
import { TbHomeFilled } from "react-icons/tb";
import { MdArticle } from "react-icons/md";
import { HiDocumentAdd } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { MdSettingsSuggest } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Aside(){

    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        // update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    return <>
    
    
    <aside className="asideleft">
        <ul>
            <Link href="/">
                <li className={activeLink === '/' ? 'navactive' : ''} 
                onClick = {() => handleLinkClick('/')}>
                    <TbHomeFilled/>
                    <span>Dashboard</span>
                </li>
            </Link>

            <Link href="/blogs">
                <li className={activeLink === '/blogs' ? 'navactive' : ''} 
                onClick = {() => handleLinkClick('/blogs')}>
                    <MdArticle/>
                    <span>Blogs</span>
                </li>
            </Link>

            <Link href="/blogs/addblog">
                <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''} 
                onClick = {() => handleLinkClick('/blogs/addblog')}>
                    <HiDocumentAdd />
                    <span>Add Blog</span>
                </li>
            </Link>

            <Link href="/draft">
                <li className={activeLink === '/draft' ? 'navactive' : ''} 
                onClick = {() => handleLinkClick('/draft')}>
                    <MdPendingActions/>
                    <span>Pending</span>
                </li>
            </Link>

            <Link href="/setting">
                <li className={activeLink === '/setting' ? 'navactive' : ''} 
                onClick = {() => handleLinkClick('/setting')}>
                    <MdSettingsSuggest/>
                    <span>Settings</span>
                </li>
            </Link>
        </ul>
    </aside>
    </>
}