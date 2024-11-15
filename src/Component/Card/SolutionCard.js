import { Link } from 'react-router-dom';

const SolutionCard = ({ icon, title, description, buttonText, link }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link}>
      <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
        {buttonText}
      </button>
      </Link>
    </div>
  );

export default SolutionCard;