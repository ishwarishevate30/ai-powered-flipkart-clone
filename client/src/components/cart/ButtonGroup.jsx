
import { Box, Button, ButtonGroup,styled} from "@mui/material";    

const Component = styled(ButtonGroup)`
    display: flex;
    align-items: center;
    margin-top: 10px;
`

const StyledButton = styled(Button)`
   border-radius: 50%;
`

const GroupedButton = () => {
    return (
        <Component>
            <StyledButton>-</StyledButton>
            <Button disabled>1</Button>
            <StyledButton>+</StyledButton>
        </Component>
    );
}

export default GroupedButton;