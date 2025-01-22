import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../../Components/Loading";

import { MdPendingActions } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import useFetchData from "../../hooks/useFetchData";
import Dataloading from "../../Components/Dataloading";


export default function draft() {

    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // you can change how much blogs you want on every page
    const [perPage] = useState(5);


    // fetch blogs form api endpoint with hooks
    const { alldata, loading } = useFetchData('/api/blogapi');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const allblog = alldata.length;


    // search function
    const filteredBlog = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    const currentBlogs = filteredBlog.slice(indexOfFirstblog, indexOfLastblog);


    // Filter draft blogs first
    const draftBlogs = filteredBlog.filter(ab => ab.status === 'draft');

    // Calculate total pages for draft blogs
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(draftBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    // Slice the draft blogs for the current page
    const currentDraftBlogs = draftBlogs.slice(indexOfFirstblog, indexOfLastblog);





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
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>All Draft <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdPendingActions /> <span>/</span> <span>Draft Blogs</span>
                    </div>
                </div>

                <div className="blogstable" data-aos="fade-up">


                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Edit / Delete </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> : <>
                                {currentDraftBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Draft Blogs</td>
                                    </tr>
                                ) : (
                                    currentDraftBlogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstblog + index + 1}</td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td><pre>{blog.slug}</pre></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/blogs/edit/' + blog._id}> <button title="edit"> <FaEdit /> </button> </Link>
                                                    <Link href={'/blogs/delete/' + blog._id}> <button title="delete"> <RiDeleteBin6Fill /> </button> </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}


                            </>}

                        </tbody>
                    </table>

                    {draftBlogs.length === 0 ? (
                        ''
                    ) : (
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} >
                                Previous
                            </button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button key={number}

                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= pageNumbers.length}>
                                Next
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </>
    }


}