import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaHtml5 } from "react-icons/fa6";
import { MdBiotech } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { GiWorld } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";



export default function Home() {

  const [currentPage, setCurrentPage] = useState(1); // Page number
  const [perPage] = useState(5); // Five blogs per page

  // Fetch data from the API
  const { alldata = [], loading } = useFetchData('/api/getblog');

  // Filter published blogs
  const publishedblogs = alldata.filter((ab) => ab.status === "publish");

  // Pagination logic
  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = publishedblogs.slice(indexOfFirstblog, indexOfLastblog);

  // Generate page numbers
  const totalPages = Math.ceil(publishedblogs.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <>
      <Head>
        <title>LVR Blogs</title>
        <meta name="description" content="LVR Front End Blog Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>
              Hi, I'm <span>Venuja Ranasinghe</span>. <br /> Computer Science Undergraduate
            </h1>
            <h3>
              I am a second-year undergraduate pursuing a degree in Computer Science at SLIIT, driven by a passion for
              exploring innovative technologies and creating impactful solutions.
            </h3>
            <div className="flex gap-2">
              <a
                href="https://venujaranasinghe.github.io/portfolio-react/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Contact Me</button>
              </a>
              <a
                href="https://venujaranasinghe.github.io/portfolio-react/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>About Me</button>
              </a>

            </div>
          </div>
          <div className="rightheader_img"></div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Hot Off the Keyboard</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : currentBlogs.length === 0 ? (
                <p>No blogs available.</p>
              ) : (
                currentBlogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="blog" key={blog._id}>
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <img src={firstImageUrl || "/img/noimage.png"} alt={blog.title} />
                        </Link>
                      </div>
                      <div className="bloginfo">
                        <Link href={`/tag/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>
                        </Link>
                        <p>{blog.description.slice(0, 100)}...</p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img src="/img/coder.jpeg" alt="coder" />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>Venuja Ranasinghe</h4>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
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
            </div>
            <div className="blogpagination">
              {totalPages > 1 && (
                <div className="blogpagination">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                  {pageNumbers
                    .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages))
                    .map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${currentPage === number ? "active" : ""}`}
                      >
                        {number}
                      </button>
                    ))}
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Focuses & Concepts</h2>
              <div className="topics_list">
                <Link href={'/topics/webdevelopment'}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Web Development</h3>
                  </div>
                </Link>

                <Link href={'/topics/techstack'}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <MdBiotech />
                    </div>
                    <h3>Tech Stack</h3>
                  </div>
                </Link>

                <Link href={'/topics/machinelearning'}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiArtificialIntelligence />
                    </div>
                    <h3>Machine Learning & AI</h3>
                  </div>
                </Link>

                <Link href={'/topics/other'}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiWorld />
                    </div>
                    <h3>Other</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href='/tag/html'>#html</Link>
                <Link href='/tag/css'>#css</Link>
                <Link href='/tag/javascript'>#javascript</Link>
                <Link href='/tag/nextjs'>#nextjs</Link>
                <Link href='/tag/reactjs'>#reactjs</Link>
                <Link href='/tag/java'>#java</Link>
                <Link href='/tag/database'>#database</Link>
                <Link href='/tag/python'>#python</Link>
                <Link href='/tag/ai-ml'>#ai-ml</Link>
                <Link href='/tag/science'>#science</Link>
                <Link href='/tag/tech'>#tech</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Get In Touch !</h2>
              <div className="talk_sec">
                <h4>I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <a href="https://github.com/venujaranasinghe" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  </div>
                  <div className="st_icon">
                    <a href="https://web.facebook.com/venuja.ranasinghe.3" target="_blank" rel="noopener noreferrer">
                      <SiFacebook />
                    </a>
                  </div>
                  <div className="st_icon">
                    <a href="https://www.instagram.com/la_venuja/" target="_blank" rel="noopener noreferrer">
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div className="st_icon">
                    <a href="https://www.linkedin.com/in/venuja-ranasinghe/" target="_blank" rel="noopener noreferrer">
                      <IoLogoLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
