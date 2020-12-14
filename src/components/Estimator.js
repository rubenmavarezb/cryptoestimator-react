import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Div = styled.div`
    font-family:'Bebas Neue', cursive;
    color:#fff;
`;
const P = styled.p`
    font-size:18px;

    span{
        font-weight:bold;
    }
`;
const Price = styled.p`
    font-size:30px;

    span{
        font-weight:bold;
    }
`;

const Estimator = ({APIresult}) => {

    if(Object.keys(APIresult).length === 0) return null;

    return ( 
        <Div>
            <Price>The price is: <span>{APIresult.PRICE}</span></Price>
            <P>Higher price of today: <span>{APIresult.HIGHDAY}</span></P>
            <P>Lower price of today: <span>{APIresult.LOWDAY}</span></P>
            <P>Today's fluctuation: <span>{APIresult.CHANGEPCT24HOUR}</span></P>
            <P>Last update: <span>{APIresult.LASTUPDATE}</span></P>
        </Div>
     );
}

Estimator.propTypes = {
    APIresult: PropTypes.object.isRequired
}
 
export default Estimator;