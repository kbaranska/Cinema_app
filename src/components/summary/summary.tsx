import React, { useState } from "react";
import Spinner from "../common/spinner";
import useEffectAsync from "../service/useEffectAsync";
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import html2canvas from 'html2canvas';  
import jsPDF from 'jspdf';  
import { Button } from "@material-ui/core";


export default function Summary() {
    const ref = React.createRef();
    const [movie_data, setMovieData] = useState(null);
    const [tickets_data, setTicketsData] = useState(null);
    const [seats_data, setSeatsData] = useState(null);

    const [isLoading, setIsLoading] = useState(false)
    const [dataChanged, setDataChanged] = useState(false);
    const load = async () => {
        setIsLoading(true)
        let m_data = JSON.parse(localStorage.getItem('chosen_movie'));
        console.log(m_data)
        setMovieData(m_data)

        let t_data = JSON.parse(localStorage.getItem('ticket_info'));
        setTicketsData(t_data)
        console.log(t_data)

        let s_data = JSON.parse(localStorage.getItem('booked_seats'));
        setSeatsData(s_data)
        console.log(s_data)

        setIsLoading(false)
    }
    useEffectAsync(async () => {

        load();
    }, [dataChanged])

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      );
     const printDocument=() =>{  
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("download.pdf");  
          });  
      }  
    
    return (<div>{isLoading ? <Spinner /> : movie_data === null ? <Spinner /> : <div id="pdfdiv"><div className="info_div"> Chosen movie: {movie_data.movieTitle} <br />
            Date: {movie_data.chosenDay}<br />
            Hour: {movie_data.hour} <br />
            Hall: {movie_data.hall_id.substring(1, 2)} <br />
            Chosen seats: {seats_data.map(it => { return it + ','; })} <br />
           Tickets:
        <div> <table><thead>
            <th scope="col">Type</th> 
            <th scope="col">Regular Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sub total</th>
        </thead>
        {tickets_data.map(t => {
        return(        <tbody>

            <td>{t.type}</td>
            <td>{t.price}</td>
            <td>{t.quantity}</td>
            <td>{t.subtotal}</td>
            </tbody>
            )})}
            </table></div>
        
    </div></div>} 
                                <button onClick={printDocument}>Generate Ticket</button>
  {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> */}
         </div>)
}