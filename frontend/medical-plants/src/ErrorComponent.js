import React, { useState } from 'react';

const ErrorComponent = ({errorMessage}) => {

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default ErrorComponent;