import React from "react";
import Link from "next/link";
import {
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Audio Master All rights reserved.</p>
      <p className="icons">
        <Link
          href="https://www.linkedin.com/in/deepanshu-somani"
          target="_blank"
        >
          <AiFillLinkedin />
        </Link>
        <Link href="https://github.com/dsomani125" target="_blank">
          <AiOutlineGithub />
        </Link>
        <Link href="https://twitter.com/dsomani125" target="_blank">
          <AiOutlineTwitter />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
