import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
            ) : value >= index - 0.5 ? (
              <StarHalf className='w-4 h-4 fill-yellow-400 text-yellow-400' />
            ) : (
              <Star className='w-4 h-4 text-black-300 dark:text-black-600' />
            )}
          </span>
        ))}
      </div>
      {text && (
        <span className='text-sm text-black-600 dark:text-black-400'>
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;