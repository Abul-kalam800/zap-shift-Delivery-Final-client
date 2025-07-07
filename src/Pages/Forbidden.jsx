import { AiOutlineLock } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center"
      >
        <AiOutlineLock className="text-red-500 w-24 h-24 mb-4" />
        <h2 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
