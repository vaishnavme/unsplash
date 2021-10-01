import { useState, useEffect } from 'react';
import { Container, ImageDetails, ImageGrid } from '../components';
import styles from '../styles/Home.module.css';
import axios from 'axios';

//api variables
import { BASE_URL } from '../API';

export default function Home() {
   const [pageData, setPageData] = useState([]);
   const [page, setPage] = useState(1);

   // note self -> single image & modal
   const [isModalVisible, setModalVisible] = useState(false);
   const [imageInfo, setImageInfo] = useState(null);

   async function fetchData() {
      const urlPageNo = `&page=${page}`;
      const url = `${BASE_URL}/${urlPageNo}`;
      try {
         const response = await axios.get(
            `https://api.unsplash.com/photos?page=${page}`,
            {
               headers: {
                  Authorization: `Client-ID piCNWVlHbIJOKun5DD0_V3UBTeNkwINd86b22r84eOA`
               }
            }
         );
         setPageData(response.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchData();
   }, []);

   const viewImageDetailsHandler = (image) => {
      setModalVisible(true);
      setImageInfo(image);
      console.log(image);
   };

   return (
      <Container>
         <h1>Image Gallary</h1>
         <ImageGrid
            pageData={pageData}
            showImageModal={viewImageDetailsHandler}
         />
         {isModalVisible && (
            <ImageDetails
               imageInfo={imageInfo}
               setModalVisible={setModalVisible}
            />
         )}
      </Container>
   );
}
