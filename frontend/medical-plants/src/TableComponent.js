import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)(() => ({
    marginTop: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
}));

const StyledTable = styled(Table)(() => ({
    minWidth: 650,
}));

const StyledTableHeader = styled(TableHead)(() => ({
    backgroundColor: '#f2f2f2',
}));

const StyledTableCell = styled(TableCell)(() => ({
    fontWeight: 'bold',
    color: '#333',
    borderBottom: 'none',
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#f5f5f5',
    },
}));

const TableComponent = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5202/api/Plant/GetAll?offset=0&limit=20')
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(error => console.log(error));
    }, []);

    return (
    <StyledTableContainer component={Paper}>
        <StyledTable>
            <StyledTableHeader>
                <StyledTableRow>
                    <StyledTableCell>Column 1</StyledTableCell>
                    <StyledTableCell>Column 2</StyledTableCell>
                </StyledTableRow>
            </StyledTableHeader>
            <TableBody>
                {data.map((item) => (
                    <StyledTableRow key={item.plantId}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </StyledTable>
    </StyledTableContainer>
    );
};

export default TableComponent;
