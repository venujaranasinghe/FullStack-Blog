import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";


export default function Header() {

    // searchbar open and close function
    const [searchopen, setSearchopen] = useState(false);

    // for open searchbar
    const openSearch = () => {
        setSearchopen(!searchopen);
    }

    // for close searchbar
    const closeSearch = () => {
        setSearchopen(false);
    }



    // asidebar for mobile device
    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }

    // for close aside menu when click on link also 
    const handleLinkClick = () => {
        setAside(false);
    }

    // Dark Mode on off
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // check local storage for darkmode preference on initial load
        const isDarkMode = localStorage.getItem('darMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Apply dark mode styles when darkMode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark'); // Remove the dark class
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // toggle dark mode status
    }

    // search data fetch
    const { alldata, loading } = useFetchData('/api/getblog');

    // filtering published blogs
    const publishedblogs = alldata.filter(ab => ab.status === "publish");

    const [searchQuery, setsearchQuery] = useState('');

    // filtering based on search query, search data from title
    const filteredBlogs = searchQuery.trim() === '' ? publishedblogs : publishedblogs.filter
        (blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return <>
        <div className="header_sec">
            <div className="container header">
                {/* <div className="logo">
                    <Link href="/"><h1>LV MADE IT</h1></Link>
                </div> */}
                <div className="searchbar">
                    <IoSearch />
                    <input onClick={openSearch} value={searchQuery}
                        onChange={(e) => setsearchQuery(e.target.value)} type="search" placeholder="Discover news, articles and more" />
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li>
                            <a href="https://venujaranasinghe.github.io/portfolio-react/" target="_blank" rel="noopener noreferrer">
                                About Me
                            </a>
                        </li>
                        <li>
                            <a href="https://venujaranasinghe.github.io/portfolio-react/" target="_blank" rel="noopener noreferrer">
                                Contact
                            </a>
                        </li>
                    </ul>


                    {/* for mobile device */}
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoon /> : <LuSun />}</button>
                        <button onClick={openSearch}><IoSearch /></button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearch />
                    <input type="search"
                        value={searchQuery}
                        onChange={(e) => setsearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>
                <div className="search_data text-center">
                    {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div> : <>
                        {searchQuery ? <>
                            {filteredBlogs.slice(0, 3).map((blog) => {
                                return <Link onClick={closeSearch} className="blog" key={blog._id} href={`/blog/${blog.slug}`}>
                                    <div className="bloginfo">
                                        <div><h3>{blog.slug}</h3></div>
                                        <p>Welcome to our Blog App – your one-stop destination for insightful articles and stories. Explore a wide range of categories, from technology and lifestyle to personal growth and beyond. Whether you're here to learn, be inspired, or simply enjoy a good read, our platform offers content tailored to your interests. Stay curious, stay connected, and discover something new every day!</p>
                                    </div>
                                </Link>
                            })}

                        </> : <div>No Search Result</div>}
                    </>}
                </div>
                <div className="exit_search" onClick={closeSearch}>
                    <FaXmark />
                    <h4>EXIT</h4>
                </div>
            </div>

            {/* mobile navlist */}
            <div className={aside ? `navlist_mobile open` : 'navlist_mobile'}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>LV MADE IT</h1>
                    <button onClick={asideClose}><FaXmark /></button>
                </div>
                <hr />
                <h3 className="mt-3">Main Menu</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/">Home</Link></li>
                    <li>
                        <a href="https://venujaranasinghe.github.io/portfolio-react/" target="_blank" rel="noopener noreferrer">
                            About Me
                        </a>
                    </li>
                    <li>
                        <a href="https://venujaranasinghe.github.io/portfolio-react/" target="_blank" rel="noopener noreferrer">
                            Contact
                        </a>
                    </li>
                </ul>
                <hr />
                <h3 className="mt-3">Topics</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/topics/webdevelopment">Web Development</Link></li>
                    <li><Link href="/topics/techstack">Tech Stack</Link></li>
                    <li><Link href="/topics/machinelearning">Machine Learning & AI</Link></li>
                    <li><Link href="/topics/other">Other</Link></li>
                </ul>
            </div>
        </div>
    </>
}