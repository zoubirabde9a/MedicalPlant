import React from 'react';
import { styled } from '@mui/system';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';


const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#f5f5f5',
}));

const StyledButton = styled(Button)(() => ({
    color: '#000000',
}));

const StyledTypography = styled(Typography)(() => ({
    color: '#000000',
}));

const TaskBar = () => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledTypography variant="h6">Plants</StyledTypography>
                <StyledButton color="inherit">PlantList</StyledButton>
                <StyledButton color="inherit">Add Plant</StyledButton>
                <StyledButton color="inherit">Add Something</StyledButton>
            </Toolbar>
        </StyledAppBar>
    );
};

export default TaskBar;