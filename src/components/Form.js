import React, { useEffect, useState } from 'react';
import Error from './Error'
import useCurrency from '../hooks/useCurrency';
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

const Button = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color: #FFF;
    transition: background-color .3s ease-in-out;

    &:hover{
        background-color: #326ac0;
        cursor:pointer;
    }


`;


const Form = ({saveCurrency, saveCrypto}) => {

    //State for the crypto currency API
    const [cryptoList, saveCryptoList] = useState([]);
    //state to set an error if the API response === 404
    const [error, setError] = useState(false);
    //Array of some country currencies
    const countryList = [
        { code: 'USD', name: 'American Dolar' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'ARS', name: 'Argentine Peso' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Sterling Pound' },
    ]
    //Custom hook to generate the options of the country currencies
    const [ countryCurrency, SelectCurrency ] = useCurrency('Select your currency', '', countryList);
    //Custom hook to generate the options of the crypto currencies
    const [ cryptoCurrency, SelectCryptoCurrency ] = useCryptoCurrency('Select your crypto', '', cryptoList);

    //Function to estimate the value of the crypto depending of the currencies selected
    const handleForm = (e) => {
        e.preventDefault();

        //Validate the selects
        if(countryCurrency === '' || cryptoCurrency === ''){
            setError(true);
            return;
        }

        setError(false);
        saveCurrency(countryCurrency);
        saveCrypto(cryptoCurrency);
    }

    useEffect(() => {
        const APIget = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const result = await axios.get(url);

            saveCryptoList(result.data.Data)
        }
        APIget();
    }, [])

    return ( 
        <form
            onSubmit={handleForm}
        >
            {error ? <Error msg="Both fields must be selected"/> : null}
            <SelectCurrency/>
            <SelectCryptoCurrency/>
            <Button
                type='submit'
                value='Estimate'
            />
        </form>
     );
}

Form.propTypes = {
    saveSearch: PropTypes.func.isRequired,
    setConsult: PropTypes.func.isRequired
}
 
export default Form;