import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 <strong>Darbni</strong> — All rights reserved
      </p>

      <span className="footer-credit">
        Built by Rahaf AbuMelish
      </span>

      {/* ICONS */}
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/rahaf-abumelish"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>

        <a
          href="https://github.com/rahafabumelish"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;