import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import '../styles/about-page.css';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <Container text>
      <Header>About</Header>
      <Segment>
      <p>This website is built by Yenting Chen (陳彥廷)</p>
      <h4>Front-end:</h4>
      <ol>
      <li>React</li>
      <li>Semantic&nbsp;UI</li>
      <li>Quill rich text editor</li>
      </ol>
      <p><strong>Back-end:</strong></p>
      <ol>
      <li>Express</li>
      <li>GraphQL</li>
      <li>Google Cloud Datastore</li>
      <li>Google Cloud Storage</li>
      <li>Google Cloud Compute Engine</li>
      <li>mocha (unit test)</li>
      <li>passport</li>
      </ol>
      <p>&nbsp;</p>
      </Segment>
    </Container>
  );
};

export default AboutPage;
