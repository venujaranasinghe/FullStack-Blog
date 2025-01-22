import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Page number
    const [perPage] = useState(3); // Six blogs per page
    const [blog, setBlog] = useState([]);
    const router = useRouter();

    const { tags } = router.query;

    useEffect(() => {
        // Function to fetch blog data
        const fetchBlogData = async () => {
            try {
                const res = await axios.get(`/api/getblog?tags=${tags}`);
                const allData = res.data;
                setBlog(allData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog data", error);
                setLoading(false);
            }
        };

        // Fetch blog data only if category exists
        if (tags) {
            fetchBlogData();
        } else {
            router.push("/404");
        }
    }, [tags]);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

    const allBlog = blog.length;
    const totalPages = Math.ceil(allBlog / perPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Filter published blogs
    const publishedBlogs = blog.filter((ab) => ab.status === "publish");

    // Extract the first image URL from markdown content
    function extractFirstImageUrl(markdownContent) {
        if (!markdownContent || typeof markdownContent !== "string") {
            return null;
        }
        const regex = /!\[.*?\]\((.*?)\)/;
        const match = markdownContent.match(regex);
        return match ? match[1] : null;
    }

    return (
        <div className="blogpage">
            <div className="category_slug">
                <div className="container">
                    <div className="category_title">
                        <div className="flex gap-1">
                            <h1>{loading ? <div>Loading...</div> : publishedBlogs ?
                            publishedBlogs && publishedBlogs[0]?.tags : 
                            publishedBlogs && publishedBlogs.tags}</h1>
                            <span>{loading ? <div>0</div> : publishedBlogs.filter(blog => blog.tags).length}</span>
                        </div>
                        <p>
                        Welcome to our Blog App – your one-stop destination for insightful articles and stories. Explore a wide range of categories, from technology and lifestyle to personal growth and beyond. Whether you're here to learn, be inspired, or simply enjoy a good read, our platform offers content tailored to your interests. Stay curious, stay connected, and discover something new every day!
                        </p>
                    </div>
                    <div className="category_blogs mt-3">
                        {loading ? (
                            <div className="wh-100 flex flex-center mt-2 pb-5">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            currentBlogs.map((item) => {
                                const firstImageUrl = extractFirstImageUrl(item.description);
                                return (
                                    <div className="cate_blog" key={item._id}>
                                        <Link href={`/blog/${item.slug}`}>
                                            <img
                                                src={firstImageUrl || "/img/noimage.png"}
                                                alt={item.title}
                                            />
                                        </Link>
                                        <div className="bloginfo mt-2">
                                            <Link href={`/tag/${item.tags[0]}`}>
                                                <div className="blogtag">{item.tags[0]}</div>
                                            </Link>
                                            <Link href={`/blog/${item.slug}`}>
                                                <h3>{item.title}</h3>
                                            </Link>
                                            <p>{item.description.slice(0, 100)}...</p>
                                            <div className="blogauthor flex gap-1">
                                                <div className="blogaimg">
                                                    <img src="/img/coder.jpeg" alt="coder" />
                                                </div>
                                                <div className="flex flex-col flex-left gap-05">
                                                    <h4>Venuja Ranasinghe</h4>
                                                    <span>
                                                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        {/* Pagination Below Blogs */}
                        {totalPages > 1 && (
                            <div className="blogpagination mt-4">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {pageNumbers.map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`${currentPage === number ? "active" : ""}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
