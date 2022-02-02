import React from 'react';
import './App.css';
import {Container} from '@chakra-ui/react'
import {Box} from '@chakra-ui/react'

function App() {
    return (
        <div className="App">
            <Container  maxW='container.xl'>
                <Box bg='tomato' w='100%' p={4} color='white'>
                    Welcome
                </Box>
            </Container>
        </div>
    );
}

export default App;
