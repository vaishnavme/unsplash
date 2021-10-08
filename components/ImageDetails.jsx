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
                  <button
                     aria-label="button-close"
                     onClick={() => setModalVisible(false)}
                  >
                     <i className="bx bx-x h1"></i>
                  </button>
               </div>
            </div>
            <div className={styles.cardBody}>
               <div
                  style={{
                     width: '100%',
                     maxWidth: '700px',
                     minWidth: '350px',
                     height: '550px',
                     position: 'relative',
                     zIndex: 26
                  }}
               >
                  <Image
                     src={imageInfo?.urls.regular}
                     alt={imageInfo?.description}
                     layout="fill"
                     objectFit="contain"
                  />
               </div>
            </div>
            <div className={styles.cardText}>
               <div>
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
               <div className={styles.cardActions}>
                  <a
                     className="button-link"
                     href={imageInfo?.urls.full}
                     target="_blank"
                     rel="noreferrer"
                     title="View Full Resolution"
                  >
                     <button aria-label="button-for-size" className="btn">
                        Original Size
                     </button>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};
