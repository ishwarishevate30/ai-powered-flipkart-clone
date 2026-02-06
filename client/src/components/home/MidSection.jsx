import {Box} from '@mui/material';
import { imageURL } from '../../constants/data';


const MidSection = ({products, title, timer}) => {
    return (
        
        <Box style={{display: 'flex', justifyContent: 'space-between', marginTop:10}}>
            {imageURL.map((image, index) => (
                <img key={index} src={image} alt="mid-section" style={{width: '33%', marginTop:10}} />
               
            ))}
        </Box>
        
    )
}
export default MidSection;
            