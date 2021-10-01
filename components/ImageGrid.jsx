import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/ImageGrid.module.css';

export const ImageGrid = ({ pageData, showImageModal, lastElementRef }) => {
   const [isGridViewActive, setGridViewActive] = useState(true);

   return (
      <main>
         <div className={styles.action}>
            <button onClick={() => setGridViewActive(false)}>
               <i
                  className={`bx bx-list-ul ${
                     !isGridViewActive && styles.active
                  }`}
               ></i>
            </button>
            <button onClick={() => setGridViewActive(true)}>
               <i
                  className={`bx bxs-grid ${isGridViewActive && styles.active}`}
               ></i>
            </button>
         </div>

         <div
            className={`${styles.container} ${
               isGridViewActive ? styles.grid4 : styles.grid1
            }`}
         >
            {pageData?.map((image, index) => (
               <div
                  key={image?.id}
                  className={styles.gridItem}
                  onClick={() => showImageModal(image)}
                  ref={pageData.length === index + 1 ? lastElementRef : null}
               >
                  <Image
                     src={image.urls.regular}
                     alt={image.description}
                     width={550}
                     height={500}
                     layout="responsive"
                  />
               </div>
            ))}
         </div>
      </main>
   );
};
