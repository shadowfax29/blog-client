import React from 'react';

const Footer = () => {
    return (
        <footer className="footer fixed-bottom bg-primary">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                    {/* <div className="col-lg-6">
                        <ul className="list-inline text-lg-end">
                            <li className="list-inline-item"><a href="/privacy-policy">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="/terms-of-service">Terms of Service</a></li>
                            <li className="list-inline-item"><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
