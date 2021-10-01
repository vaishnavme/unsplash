import Image from 'next/image';
import styles from '../styles/ImageGrid.module.css';

export const ImageGrid = ({ pageData, showImageModal, lastElementRef }) => {
   return (
      <div className={styles.container}>
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
   );
};
