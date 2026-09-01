import {Box} from '@mui/material';
import { imageURL } from '../../constants/data';


const MidSection = ({products, title, timer}) => {
    return (
        
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
            gap: 1,
            flexWrap: 'wrap',
            '@media (max-width: 1024px)': {
                gap: 1
            },
            '@media (max-width: 768px)': {
                gap: 0.5
            },
            '@media (max-width: 480px)': {
                flexDirection: 'column',
                gap: 1
            }
        }}>
            {imageURL.map((image, index) => (
                <img 
                    key={index} 
                    src={image} 
                    alt="mid-section" 
                    style={{
                        width: 'calc(33.333% - 8px)',
                        marginTop: 10,
                        objectFit: 'cover',
                        height: 'auto'
                    }}
                />
               
            ))}
        </Box>
        
    )
}
export default MidSection;
            