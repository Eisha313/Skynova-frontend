import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapPin, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl align-center flex justify-center font-bold mb-14">Contact Information</h2>
      <div className="flex items-center mb-12">
        <FontAwesomeIcon icon={faPhone} className="w-6 h-6 mr-4" />
        <span>+9290078601</span>
      </div>
      <div className="flex items-center mb-12">
        <FontAwesomeIcon icon={faMapPin} className="w-6 h-6 mr-4" />
        <span>DecimalSolutions,I-8/4 Islamabad</span>
      </div>
      <div className="flex items-center mb-12">
        <FontAwesomeIcon icon={faClock} className="w-6 h-6 mr-4" />
        <span>24/7 Available</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 mr-4" />
        <span>skynova@gmail.com</span>
      </div>
    </div>
  );
};

export default ContactInfo;
