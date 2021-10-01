import Image from 'next/image';
import styles from '../styles/ImageGrid.module.css';

export const ImageGrid = ({ pageData }) => {
   return (
      <div className={styles.container}>
         {pageData?.map((image) => (
            <div key={image.id} className={styles.gridItem}>
               <Image
                  src={image.urls.small}
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
