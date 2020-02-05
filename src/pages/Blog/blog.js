import React, {useState, useEffect} from 'react';
import marked from 'marked';
import styled from 'styled-components';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const Blog = () => {
    const [markdown, setMarkdown] = useState('');
    const [screenWidth, setWidth] = useState('');
    useEffect(() => {
        if (window.innerWidth > 480) {
            setWidth('50%');
        } else {
            setWidth('100%');
        }
        const readmePath = require('./junkbond.md');
        fetch(readmePath)
            .then(response => {
                return response.text();
            })
            .then(text => {
                setMarkdown(marked(text));
            });
    }, []);
    return (
        <Container>
            <div style={{fontSize: 19, alignContent: 'center', width: screenWidth}}>
                <article dangerouslySetInnerHTML={{__html: markdown}}/>
            </div>
        </Container>
    );
};