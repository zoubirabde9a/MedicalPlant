import React, {useState} from 'react';
import { styled } from '@mui/system';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import AddPlant from "./AddPlant";


const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#f5f5f5',
}));

const StyledButton = styled(Button)(() => ({
    color: '#000000',
}));

const StyledTypography = styled(Typography)(() => ({
    color: '#000000',
}));

const TaskBar = (props) => {

    const {setCurrentPage} = props;

    const [showModal, setShowModal] = useState(false);
    const handleSubmit = () =>
    {
        setShowModal(!showModal);
    }

    const handlePlantListSubmit = () =>
    {
        setCurrentPage('home')
    }
    const handleOriginListSubmit = () =>
    {
        setCurrentPage('plantOrigin')
    }

    const handleVegetableReignListSubmit = () =>
    {
        setCurrentPage('vegetableReign')
    }

    const handleDivisionListSubmit = () =>
    {
        setCurrentPage('plantDivision')
    }

    const handleClassListSubmit = () =>
    {
        setCurrentPage('plantClass')
    }

    const handleFamilyListSubmit = () =>
    {
        setCurrentPage('plantFamily')
    }

    const handleGenreListSubmit = () =>
    {
        setCurrentPage('plantGenre')
    }

    const handlePlantSpeciesListSubmit = () =>
    {
        setCurrentPage('plantSpecies')
    }

    const handlePlantPartListSubmit = () =>
    {
        setCurrentPage('plantPart')
    }

    const handlePlantConstituentListSubmit = () =>
    {
        setCurrentPage('PlantConstituent')
    }

    const handlePlantContraindicationListSubmit = () =>
    {
        setCurrentPage('PlantContraindication')
    }

    const handlePlantEffectListSubmit = () =>
    {
        setCurrentPage('PlantEffect')
    }

    const handlePlantNegativeEffectListSubmit = () =>
    {
        setCurrentPage('PlantNegativeEffect')
    }

    const handlePlantIndicationListSubmit = () =>
    {
        setCurrentPage('PlantIndication')
    }

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <StyledTypography variant="h6">Plantes</StyledTypography>
                <StyledButton onClick={handlePlantListSubmit} color="inherit">Liste Plante</StyledButton>
                <StyledButton onClick={handleOriginListSubmit} color="inherit">Liste Origine</StyledButton>
                <StyledButton onClick={handleVegetableReignListSubmit} color="inherit">Liste Reigne</StyledButton>
                <StyledButton onClick={handleDivisionListSubmit} color="inherit">Liste Division</StyledButton>
                <StyledButton onClick={handleClassListSubmit} color="inherit">Liste Classe</StyledButton>
                <StyledButton onClick={handleFamilyListSubmit} color="inherit">Liste Famille</StyledButton>
                <StyledButton onClick={handleGenreListSubmit} color="inherit">Liste Genre</StyledButton>
                <StyledButton onClick={handlePlantSpeciesListSubmit} color="inherit">Liste Èspece</StyledButton>
                <StyledButton onClick={handlePlantPartListSubmit} color="inherit">Liste Partie Utilisee</StyledButton>


                <StyledButton onClick={handlePlantConstituentListSubmit} color="inherit">Liste Constituents</StyledButton>
                <StyledButton onClick={handlePlantContraindicationListSubmit} color="inherit">Liste Contre Indications</StyledButton>
                <StyledButton onClick={handlePlantEffectListSubmit} color="inherit">Liste Effects</StyledButton>
                <StyledButton onClick={handlePlantNegativeEffectListSubmit} color="inherit">Liste Effects Indesirables</StyledButton>
                <StyledButton onClick={handlePlantIndicationListSubmit} color="inherit">Liste Indications</StyledButton>
            </Toolbar>
        </StyledAppBar>
    );
};

export default TaskBar;