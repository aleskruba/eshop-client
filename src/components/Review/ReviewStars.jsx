import React from 'react';
import styles from './reviewstars.module.css';

function ReviewStars({selectedStars,setSelectedStars,setSelectedStarsCheck}) {


  // Function to handle star click
  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
    setSelectedStarsCheck(true)
  };



  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((starCount) => (
        <i
          key={starCount}
          className={`fas fa-star ${styles.starIcon} ${starCount <= selectedStars ? styles.selected : ''}`}
          onClick={() => handleStarClick(starCount)}
        ></i>
      ))}
    </div>
  );
}

export default ReviewStars;
