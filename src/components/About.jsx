import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="card mb-3 border-0 shadow-sm" style={{ backgroundColor: "#fafafa" }}>
      <div className="card-body">
        <h5 className="card-title">About Himachal Academia</h5>
        <p className="card-text">
          Welcome to Himachal Academia, your one-stop destination for comprehensive knowledge about Himachal Pradesh.
          We provide valuable resources on current affairs, job updates, general knowledge, competitive exam preparation,
          and much more. Stay informed and stay ahead with Himachal Academia.
        </p>
        <div className="mt-4">
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Mandi, Himachal Pradesh, India
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:support@himachalacademia.com" className='no-underline text-dark'>support@himachalacademia.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

