import { Box,styled, Typography } from "@mui/material";


import {navData } from '../../constants/data.js';


const Component = styled(Box)`
  display: flex;
  margin: 55px 130px 0 130px;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 1024px) {
    margin: 55px 60px 0 60px;
  }
  
  @media (max-width: 768px) {
    margin: 55px 20px 0 20px;
  }
  
  @media (max-width: 480px) {
    margin: 45px 10px 0 10px;
  }
`

const Container = styled(Box)`
    padding: 12px 8px 0 8px;
    text-align: center;
    font-family: inherit;
    flex: 1;
    min-width: 70px;
    
    @media (max-width: 768px) {
      min-width: 60px;
      padding: 10px 6px 0 6px;
    }
    
    @media (max-width: 480px) {
      min-width: 50px;
      padding: 8px 4px 0 4px;
      flex: 0 1 calc(25% - 10px);
    }
`

const Text = styled(Typography)`
    font-size: 14px;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
    
    @media (max-width: 480px) {
      font-size: 11px;
    }
`
const Navbar = () =>
{
    return  (
        <Box style={{background:'#fff'}}>

        <   Component> 
                {
                    navData.map((data,index)=>(
                        <Container key={index} >
                            <img src={data.url} alt={data.text} style={{width:64}}/>
                            <Text>{data.text}</Text>
                        </Container>
                    ))
                }
            </Component>
            </Box>

    )
}
export default Navbar;