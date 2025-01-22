import Link from "next/link";

export default function Footer() {
    return <>
    
    <div className="footer">
        <div className="container flex flex-sb flex-wrap flex-left">
            <div className="footer_logo">
                <h2>LVR</h2>
                < hr/>
                <h4>&copy; 2025 Venuja Ranasinghe. All Rights Reserved.</h4>
                <h5>Coded By <span>@venujaranasinghe</span></h5>
            </div>
            <div className="q_links">
                <h3>Portal Picks</h3>
                <hr />
                <ul>
                    <li><Link href="/">Advertise With Me</Link></li>
                    <li><Link href="/">About Me</Link></li>
                    <li><Link href="/">Contact Me</Link></li>
                </ul>
            </div>
            <div className="q_links">
                <h3>Let's Connect</h3>
                <hr />
                <ul>
                    <li><Link href="https://github.com/venujaranasinghe">Github</Link></li>
                    <li><Link href="https://www.linkedin.com/in/venuja-ranasinghe/">LinkedIn</Link></li>
                    <li><Link href="https://web.facebook.com/venuja.ranasinghe.3">Facebook</Link></li>
                    <li><Link href="https://www.instagram.com/la_venuja/">Instagram</Link></li>
                </ul>
            </div>
            <div className="q_links">
                <h3>Policy Center</h3>
                <hr />
                <ul>
                    <li><Link href="/">Privacy Policy</Link></li>
                    <li><Link href="/">Cookies Policy</Link></li>
                    <li><Link href="/">Terms of Services</Link></li>
                </ul>
            </div>
        </div>
    </div>
    
    
    </>
}