import Image from 'next/image';
import styles from '../styles/ImageDetails.module.css';

export const ImageDetails = ({ imageInfo, setModalVisible }) => {
   const created = new Date(imageInfo.created_at).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
   });

   return (
      <div className={styles.main}>
         <div className={styles.card}>
            <div className={styles.cardHeader}>
               <div>
                  <h1 className={styles.heading}>{imageInfo.user.name}</h1>
               </div>
               <div>
                  <button onClick={() => setModalVisible(false)}>
                     <i className="bx bx-x h1"></i>
                  </button>
               </div>
            </div>
            <div className={styles.cardBody}>
               <div className={styles.cardImage}>
                  <Image
                     src={imageInfo?.urls.regular}
                     alt={imageInfo?.description}
                     width={800}
                     height={800}
                  />
               </div>
            </div>
            <div className={styles.cardText}>
               <p>
                  <span>Description: </span>
                  {imageInfo.alt_description || imageInfo.description}
               </p>
               <p>
                  <span>Date: </span>
                  {created}
               </p>
               <p>
                  <span>Image By:</span> {imageInfo.user.name}
               </p>
            </div>
         </div>
      </div>
   );
};
