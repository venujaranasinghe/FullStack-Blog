import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

export default function blogPage() {

    const router = useRouter();
    const { slug } = router.query;

    const [blog, setBlog] = useState(['']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            axios.get(`/api/getblog?slug=${slug}`).then(res => {
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            }).catch(error => {
                console.error("error fetching blog", error);
            })
        }
    }, [slug]);

    // markdown code highlighter
    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState();

        // copy code function 
        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000); // 3 second
        };

        if (inline) {
            return <code>{children}</code>
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }} onClick={handleCopy}>
                        {copied ? 'Copied' : 'Copy Code'}
                    </button>
                </div>
            )
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            )
        }
    }

    return <>

        <div className="slugpage">
            <div className="container">
                <div className="topslug_title">
                    <h1 className="slugtitle">
                        {loading ? <div>loading...</div> : blog && blog[0]?.title}
                    </h1>
                    <h5>By <span>Venuja Ranasinghe</span>. Published in <span>{loading ? <div>loading..</div>
                        : blog && blog[0]?.blogcategory}</span> . {blog && new Date(blog[0].createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })} <span>. 1 min read</span></h5>
                </div>

                {/* blog data section */}
                <div className="flex flex-sb flex-left pb-5 flex-wrap">
                    <div className="leftblog_data_markdown">
                        {loading ? <div className="wh-100 flex flex-center mt-3">
                            <div className="loader"></div>
                        </div> : <>
                            <div className="w-100 blogcontent">
                                <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code: Code,
                                }}
                                >
                                    {blog[0].description}
                                </ReactMarkdown>
                            </div>
                        </>}
                    </div>
                    
                </div>
            </div>
        </div>

    </>
}