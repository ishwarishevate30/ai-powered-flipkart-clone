import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
    color:blue;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

const Search = () => {
  return (
    <SearchContainer>
      <InputSearchBase placeholder="Search for products, brands and more" />
      <SearchIconWrapper>
        <SearchIcon style={{ color: '#2874f0' }} />
      </SearchIconWrapper>
    </SearchContainer>
  );
};

export default Search;
