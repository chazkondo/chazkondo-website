import React from "react"

// reactstrap components
import { Row, Container } from "reactstrap"

function Footer({ backgroundDark, isBlog }) {
    return (
        <footer
            className={
                backgroundDark ? `footer footerDark` : `footer footerLight`
            }
            style={{ borderTop: isBlog ? `1px solid rgba(40,40,40,0.3)` : `` }}
        >
            <Container>
                <Row>
                    <div className="credits ml-auto">
                        <span className="copyright">
                            © {new Date().getFullYear()} Developed by Chaz Kondo
                        </span>
                    </div>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
