import { useState, useEffect } from 'react';
import { Container, ImageGrid } from '../components';
import styles from '../styles/Home.module.css';
import axios from 'axios';

//api variables
import { BASE_URL } from '../API';

export default function Home() {
   const [pageData, setPageData] = useState([]);
   const [page, setPage] = useState(1);

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

   return (
      <Container>
         <h1>Image Gallary</h1>
         <ImageGrid pageData={pageData} />
      </Container>
   );
}
