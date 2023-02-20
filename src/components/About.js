import React from "react";

const About = () => {
  return (
    <div>
        <div className="container">
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div className="about-section">
          <h2 className="text-capitalize my-3">About Magic Notes</h2>
          <img src="https://study.com/cimages/multimages/16/adobestock_133450340.jpeg" width={800} height={400} alt="Magic Notes" className="mx-auto d-block my-3"/>
          <p>Magic Notes is a note-taking application that allows you to organize your notes and ideas in a simple and easy-to-use interface. Whether you're a student, a professional, or just someone who likes to stay organized, Magic Notes is the perfect tool for you.</p>
          <p>With Magic Notes, you can create notes  You can also add links, important docs , passwords to your notes to keep all your important information in one place.</p>
          <p>Our mission is to provide you with a note-taking application that is intuitive, user-friendly, and customizable to your needs. We believe that with Magic Notes, you can take your productivity and creativity to the next level.</p>
          <h3>Why Choose Magic Notes?</h3>
          <ul>
            <li><i className="fa fa-check"></i> Secured Your notes on cloud</li>
            <li><i className="fa fa-check"></i> Easy to use interface</li>
            <li><i className="fa fa-check"></i> Available on all devices</li>
            <li><i className="fa fa-check"></i> Safe and secure</li>
          </ul>
          <p>If you have any questions or feedback, please don't hesitate to contact us. We would love to hear from you!</p>
          <div className="mb-5">

          <a href="https://github.com/mandeep28" className="btn btn-primary">Visit Developer Profile</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  
    </div>
  );
};

export default About;
