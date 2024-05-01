import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <div className="contact-info">
          <div className="contact-method">
            <div className="icon">
            <AiTwotoneMail />
            </div>
            <p>Email: krishi.agrawal26@gmail.com</p>
          </div>
          <div className="contact-method">
            <div className="icon">
            <FaLinkedin />
            </div>
            <p>Checkout my LinkedIn: <a href='https://www.linkedin.com/in/krishiagrawal/'>View</a></p>
          </div>
          <div className="contact-method">
            <div className="icon">
            <FaGithub />
            </div>
            <p>Explore my Github: <a href='https://github.com/krishi-agrawal'>View</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
