import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios'
import Form from './components/Form'
import Estimator from './components/Estimator'
import Spinner from './components/Spinner/Spinner'
import image from './cryptomonedas.png'


const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width:992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
`;

const Img = styled.img`
    max-width: 100%;
    margin-top:5rem;
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align:left;
    font-weight:700;
    font-size:50px;
    margin-bottom: 50px;
    margin-top: 80px;
    
    &::after{
      content: '';
      width: 100px;
      height:6px;
      background-color:#66a2fe;
      display:block;
    }
`;



function App() {

  const [currency, saveCurrency] = useState('');
  const [crypto, saveCrypto] = useState('');
  const [APIresult, setApiResult] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //Prevent the app to execute if selects are empty
    const estimateCrypto = async() => {
      if(currency === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
  
      const result = await axios.get(url);

      setLoading(true);

      setTimeout(() => {
        setLoading(false)
        setApiResult(result.data.DISPLAY[crypto][currency])
      }, 3000)


    }

    estimateCrypto();

  }, [currency, crypto])

  const component = (loading) ? <Spinner/> : <Estimator APIresult={APIresult}/>

  return (
    <Container>
      <div>
        <Img
          src={image}
          alt='image crypto'
        />
      </div>
      <div >
        <Heading>Estimate cryptocurrency in just one click</Heading>
        <Form
          saveCurrency={saveCurrency}
          saveCrypto={saveCrypto}
        />
        {component}
      </div>
    </Container>
  );
}

export default App;
